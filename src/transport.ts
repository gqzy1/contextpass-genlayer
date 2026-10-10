import { createClient, abi } from 'genlayer-js';
import { studionet } from 'genlayer-js/chains';
import { TransactionHashVariant, type CalldataEncodable, type GenLayerTransaction, type TransactionHash } from 'genlayer-js/types';
import { type Address } from 'viem';
import { CHAIN_ID, RPC, WRITES_LOCKED, assertCanonicalTarget, type Intent, type ReadMethod, writeArgs, record, same } from './protocol';
import { RateLimitError, retryAfter } from './rpc';
import type { Provider } from './wallet';
const calldata=abi.calldata;
export type Receipt = { hash:string; status:string; sender:string; recipient:string; method:string; args:CalldataEncodable[]; returned:unknown; returnedNormally:boolean; failureKind?:'rollback'|'consensus'|'execution'; failureReason?:string };
export interface Transport { read(contract:Address,method:ReadMethod,args:CalldataEncodable[]):Promise<unknown>; write(intent:Intent):Promise<string>; receipt(hash:string):Promise<Receipt> }
/** The pinned SDK ignores HTTP status/Retry-After. Preserve those before its JSON decoder. */
export function installRpcGuard(host:typeof globalThis=globalThis):()=>void {
  const original=host.fetch;
  host.fetch=async(input,init)=>{
    const url=typeof input==='string'?input:input instanceof URL?input.href:input.url;
    const response=await original.call(host,input,init);
    if(url===RPC){if(response.status===429)throw new RateLimitError(retryAfter(response.headers.get('Retry-After')));
      if(!response.ok)throw new Error(`NETWORK_ERROR: HTTP ${response.status}`);}
    return response;
  };
  return ()=>{host.fetch=original;};
}
type Client=ReturnType<typeof createClient>;
export function guardedProvider(provider:Provider,intent:Intent):Provider {
  let sent=false;
  return {request:async(args)=>{
    if(args.method==='eth_sendRawTransaction'||args.method==='eth_signTransaction')throw new Error('Unsupported signing path. Use manual injected-wallet submission.');
    if(args.method==='eth_sendTransaction'){
      if(sent)throw new Error('PENDING_EXISTS');
      sent=true; // A single signing request, even when SDK ABI fallback would retry.
      if(Number(await provider.request({method:'eth_chainId'}))!==CHAIN_ID)throw new Error('WRONG_CHAIN');
      const accounts=await provider.request({method:'eth_accounts'});
      if(!Array.isArray(accounts)||!same(accounts[0],intent.account))throw new Error('Wallet changed. Reconnect before writing.');
    }
    return provider.request(args);
  }};
}
export class SdkTransport implements Transport {
  private reader:Client;
  constructor(private provider?:Provider,private permitWrite=()=>!WRITES_LOCKED,private factory:(account?:Address,provider?:Provider)=>Client=(account,suppliedProvider)=>createClient({chain:studionet,endpoint:RPC,account,provider:suppliedProvider as NonNullable<Parameters<typeof createClient>[0]>['provider']})){
    this.reader=this.factory();
  }
  async read(contract:Address,method:ReadMethod,args:CalldataEncodable[]){return this.reader.readContract({address:contract,functionName:method,args,jsonSafeReturn:false,transactionHashVariant:TransactionHashVariant.LATEST_FINAL});}
  async write(intent:Intent){
    assertCanonicalTarget(intent.contract); // Independent transport guard, before factory or provider.
    if(!this.permitWrite())throw new Error('PHASE3_WRITES_LOCKED');
    if(!this.provider)throw new Error('Connect a wallet first.');
    const client=this.factory(intent.account,guardedProvider(this.provider,intent));
    const result:unknown=await client.writeContract({address:intent.contract,functionName:intent.method,args:writeArgs(intent.method,intent.args,intent.account),value:0n,leaderOnly:false});
    if(typeof result!=='string'||!/^0x[\da-f]{64}$/i.test(result))throw new Error('SUBMISSION_UNKNOWN');return result;
  }
  async receipt(hash:string){if(!/^0x[\da-f]{64}$/i.test(hash))throw new Error('Invalid transaction ID.');
    const tx:GenLayerTransaction=await this.reader.getTransaction({hash:hash as TransactionHash});
    const receipts=tx.consensus_data?.leader_receipt;
    // Studio's leader_receipt array can also contain a canceled validator receipt.
    // Select the actual Leader in the final round; never use the final array element.
    const last=receipts?.filter(r=>r.mode==='leader').at(-1);
    const fieldsTx=record(tx);
    const consensusAccepted=fieldsTx.result_name==='MAJORITY_AGREE' && tx.consensus_data?.final!==false;
    let returned:unknown;let normal=false;let failureKind:Receipt['failureKind']='consensus';let failureReason:string|undefined;
    if(last){const result:unknown=last.result;
      const raw=typeof result==='string'?result:record(result).raw;
      if(typeof raw==='string'){const bytes=Uint8Array.from(atob(raw),c=>c.charCodeAt(0));
        if(consensusAccepted){
          failureKind='execution';
          if(bytes.length>1 && bytes[0]===0 && !last.error && last.execution_result==='SUCCESS' && tx.txExecutionResultName!=='FINISHED_WITH_ERROR'){
            returned=calldata.decode(bytes.slice(1));normal=true;failureKind=undefined;
          }else if(bytes[0]===1){failureKind='rollback';failureReason=new TextDecoder('utf-8',{fatal:true}).decode(bytes.slice(1));}
        }}
    }
    // SDK's decoded calldata supplies the actual submitted method/arguments.
    let call=tx.txDataDecoded && 'callData' in tx.txDataDecoded ? tx.txDataDecoded.callData as unknown : undefined;
    if(call===undefined && tx.data?.calldata){
      const encoded:unknown=tx.data.calldata;
      if(typeof encoded==='string')call=calldata.decode(Uint8Array.from(atob(encoded),c=>c.charCodeAt(0)));
      else{const saved=record(encoded);if(Array.isArray(saved.raw)&&saved.raw.every(v=>typeof v==='number'&&Number.isInteger(v)&&v>=0&&v<=255))call=calldata.decode(Uint8Array.from(saved.raw as number[]));}
    }
    const fields=call instanceof Map?Object.fromEntries(call):call;
    const input=fields && typeof fields==='object'?record(fields):{};
    const args=Array.isArray(input.args)?input.args as CalldataEncodable[]:[];
    return {hash:String(tx.hash??tx.txId??''),status:String(tx.statusName??tx.status??''),sender:String(tx.sender??tx.from_address??''),recipient:String(tx.recipient??tx.to_address??''),method:String(input.method??''),args,returned,returnedNormally:normal,failureKind,failureReason};
  }
}
export function assertReceiptBinding(receipt:Receipt,intent:Intent,hash:string){
  if(!same(receipt.hash,hash)||!same(receipt.sender,intent.account)||!same(receipt.recipient,intent.contract)||receipt.method!==intent.method)throw new Error('INVALID_READBACK');
  // Encoded address bytes/bigints must match, not string-coerced display values.
  const expected=calldata.encode(writeArgs(intent.method,intent.args,intent.account));
  const actual=calldata.encode(receipt.args);
  if(expected.length!==actual.length||expected.some((v,i)=>actual[i]!==v))throw new Error('INVALID_READBACK');
}
