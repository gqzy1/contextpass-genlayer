import { vi } from 'vitest';
import { type Address } from 'viem';
import type { CalldataEncodable } from 'genlayer-js/types';
import { writeArgs, type Intent } from '../src/protocol';
import { type Receipt, type Transport } from '../src/transport';
import { ReadQueue } from '../src/rpc';
export const owner='0x1111111111111111111111111111111111111111' as Address;
export const holder='0x2222222222222222222222222222222222222222' as Address;
// Public deployment address used only as a binding fixture: all transports remain offline mocks.
export const contract='0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8' as Address;
export const hash=`0x${'a'.repeat(64)}`;
export const intent:Intent={method:'apply_and_join',args:['1','2'],account:holder,contract};
export function receipt(i:Intent=intent,value:unknown='ELIGIBLE'):Receipt{return {hash,status:'FINALIZED',sender:i.account,recipient:i.contract,method:i.method,args:writeArgs(i.method,i.args,i.account),returned:value,returnedNormally:true};}
/** Scripted offline transport: never a model, validator, blockchain or signing wallet. */
export class MockTransport implements Transport {
  read=vi.fn<(contract:Address,method:Parameters<Transport['read']>[1],args:CalldataEncodable[])=>Promise<unknown>>().mockResolvedValue({status:'FOUND',space_id:1n,holder,root_attestation_id:2n,decision:'ELIGIBLE'});
  write=vi.fn<(intent:Intent)=>Promise<string>>().mockResolvedValue(hash);
  receipt=vi.fn<(hash:string)=>Promise<Receipt>>().mockResolvedValue(receipt());
}
export const queue=()=>new ReadQueue(async()=>undefined,()=>0,0);
export function storage(){const values=new Map<string,string>();return {getItem:(k:string)=>values.get(k)??null,setItem:(k:string,v:string)=>{values.set(k,v);},removeItem:(k:string)=>{values.delete(k);}};}
