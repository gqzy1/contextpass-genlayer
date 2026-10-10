import { type CalldataEncodable } from 'genlayer-js/types';
import { type Address } from 'viem';
import { CHAIN_ID, WRITES_LOCKED, assertCanonicalTarget, encodedAddress, id, integer, record, same, text, type Intent, type ReadMethod, writeArgs, validateRead } from './protocol';
import { ReadQueue } from './rpc';
import { assertReceiptBinding, type Receipt, type Transport } from './transport';
import type { Wallet } from './wallet';
export type Journal={intent:Intent;stage:'signing'|'pending'|'confirmed'|'denied'|'undetermined'|'failed';hash?:string;message?:string;returnedId?:string};
export class Transactions {
  private busy=false;
  constructor(private transport:Transport,private wallet:Pick<Wallet,'assert'>,private storage:Pick<Storage,'getItem'|'setItem'|'removeItem'>,private queue=new ReadQueue(),private locked=WRITES_LOCKED){}
  private key(contract:Address){return `contextpass:v1:${CHAIN_ID}:${contract.toLowerCase()}`;}
  saved(contract:Address):Journal|undefined{try{const raw=this.storage.getItem(this.key(contract));if(!raw)return;
    const data:unknown=JSON.parse(raw);const j=record(data);const intent=record(j.intent);
    if(!same(intent.contract,contract)||!['signing','pending','confirmed','denied','undetermined','failed'].includes(String(j.stage)))throw new Error();
    if(!Array.isArray(intent.args)||!intent.args.every(v=>typeof v==='string'))throw new Error();
    writeArgs(intent.method as Intent['method'],intent.args as string[],intent.account as Address);
    return data as Journal;
  }catch{throw new Error('STORAGE_UNAVAILABLE');}}
  recover(contract:Address):Journal|undefined{const j=this.saved(contract);if(!j)return;return {...j,stage:j.hash?'pending':'signing',message:j.hash?'Saved local transaction ID. Reverify FINALIZED receipt and readback; cached confirmation is not authority.':'SUBMISSION_UNKNOWN'};}
  private save(j:Journal){try{this.storage.setItem(this.key(j.intent.contract),JSON.stringify(j));}catch{throw new Error('STORAGE_UNAVAILABLE');}}
  read(contract:Address,method:ReadMethod,args:CalldataEncodable[]=[]){const key=JSON.stringify([contract,method,args],(_,v:unknown)=>typeof v==='bigint'?v.toString():v);return this.queue.run(key,async()=>validateRead(method,await this.transport.read(contract,method,args)));}
  async submit(intent:Intent):Promise<Journal>{
    writeArgs(intent.method,intent.args,intent.account);
    assertCanonicalTarget(intent.contract); // Before storage, wallet access or signing.
    if(this.locked)throw new Error('PHASE3_WRITES_LOCKED');
    if(this.busy)throw new Error('PENDING_EXISTS');this.busy=true;
    try{const prior=this.saved(intent.contract);if(prior&&['signing','pending','undetermined'].includes(prior.stage))throw new Error('PENDING_EXISTS');
      await this.wallet.assert(intent.account);
      const current=this.saved(intent.contract);if(current&&['signing','pending','undetermined'].includes(current.stage))throw new Error('PENDING_EXISTS');
      const j:Journal={intent,stage:'signing'};this.save(j); // Persist before asking wallet; fail closed on storage failure.
      try{const hash=await this.transport.write(intent);j.hash=hash;j.stage='pending';this.save(j);return j;}
      catch(e){const rejected=(e as {code?:number}).code===4001;j.stage=rejected?'failed':'signing';j.message=rejected?'WALLET_REJECTED':'SUBMISSION_UNKNOWN';this.save(j);throw e;}
    }finally{this.busy=false;}
  }
  attachHash(contract:Address,hash:string):Journal{const j=this.saved(contract);if(!j||j.stage!=='signing'||!/^0x[\da-f]{64}$/i.test(hash))throw new Error('Invalid recovery transaction ID.');j.hash=hash;j.stage='pending';this.save(j);return j;}
  async verify(contract:Address):Promise<Journal>{
    const j=this.saved(contract);if(!j?.hash)throw new Error('SUBMISSION_UNKNOWN');
    const receipt=await this.queue.run(`receipt:${j.hash}`,()=>this.transport.receipt(j.hash!));
    if(['UNDETERMINED','VALIDATORS_TIMEOUT','LEADER_TIMEOUT'].includes(receipt.status)){j.stage='undetermined';j.message='Consensus unresolved. No admission is assumed.';this.save(j);return j;}
    if(receipt.status==='CANCELED'){j.stage='failed';j.message='Transaction canceled; no approval.';this.save(j);return j;}
    if(receipt.status!=='FINALIZED'){j.stage='pending';j.message='Awaiting FINALIZED receipt. Refresh manually.';this.save(j);return j;}
    assertReceiptBinding(receipt,j.intent,j.hash);
    if(!receipt.returnedNormally){j.stage=receipt.failureKind==='consensus'?'undetermined':'failed';j.message=receipt.failureKind==='rollback'?`Business rejection (rollback): ${receipt.failureReason||'Contract rejected the call'}. No state change.`:receipt.failureKind==='consensus'?'Consensus acceptance could not be verified. No approval is assumed.':'Finalized execution failed. This is not NOT_ELIGIBLE.';this.save(j);return j;}
    const label=await this.readback(j.intent,receipt);
    j.stage=label==='NOT_ELIGIBLE'?'denied':'confirmed';j.message=label==='NOT_ELIGIBLE'?'NOT_ELIGIBLE — permanent decision; no posting permission.':'FINALIZED receipt and matching onchain readback verified.';
    if(['create_space','issue_attestation','post_room_note'].includes(j.intent.method))j.returnedId=integer(receipt.returned).toString();
    this.save(j);return j;
  }
  private async readback(i:Intent,r:Receipt):Promise<string|undefined>{
    const args=i.args;const require=(ok:boolean)=>{if(!ok)throw new Error('INVALID_READBACK');};
    switch(i.method){
      case 'create_space': {const sid=id(integer(r.returned).toString());const s=record(await this.read(i.contract,'get_space',[sid]));require(s.status==='FOUND'&&integer(s.id)===sid&&same(s.owner,i.account)&&s.title===text(args[0],80)&&s.required_scope===text(args[1],320)&&same(s.trusted_issuer,args[2]));break;}
      case 'issue_attestation': {const rid=id(integer(r.returned).toString());const a=record(await this.read(i.contract,'get_attestation',[rid]));require(a.status==='FOUND'&&integer(a.id)===rid&&same(a.issuer,i.account)&&same(a.holder,args[0])&&a.label===text(args[1],80)&&a.source_scope===text(args[2],320)&&typeof a.revoked==='boolean');break;}
      case 'revoke_attestation': {require(r.returned===null);const a=record(await this.read(i.contract,'get_attestation',[id(args[0])]));require(a.status==='FOUND'&&integer(a.id)===id(args[0])&&same(a.issuer,i.account)&&a.revoked===true);break;}
      case 'apply_and_join': {require(r.returned==='ELIGIBLE'||r.returned==='NOT_ELIGIBLE');const d=record(await this.read(i.contract,'get_decision',[id(args[0]),encodedAddress(i.account)]));require(d.status==='FOUND'&&integer(d.space_id)===id(args[0])&&same(d.holder,i.account)&&integer(d.root_attestation_id)===id(args[1])&&d.decision===r.returned);return String(r.returned);}
      case 'post_room_note': {const nid=id(integer(r.returned).toString());let found=false;
        for(const offset of [0n,20n]){const page=record(await this.read(i.contract,'get_room_notes',[id(args[0]),offset,20n]));require(page.status==='FOUND'&&Array.isArray(page.notes));
          for(const value of page.notes as unknown[]){const n=record(value);if(integer(n.id)===nid){require(integer(n.space_id)===id(args[0])&&same(n.author,i.account)&&n.text===text(args[1],240));found=true;}}
          if(integer(page.next_offset)>=integer(page.total))break;}
        require(found);break;}
    }
    return undefined;
  }
}
