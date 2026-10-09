import { it, expect } from 'vitest';
import type { Address } from 'viem';
import { CalldataAddress, type CalldataEncodable } from 'genlayer-js/types';
import { Transactions } from '../src/transactions';
import { type Intent, integer, record, same } from '../src/protocol';
import { type Receipt, type Transport } from '../src/transport';
import { contract,holder,owner,queue,receipt,storage } from './fixtures';
/** Offline product wiring model only. Classification is scripted, never a real LLM or consensus vote. */
class JourneyTransport implements Transport {
  spaces=new Map<bigint,Record<string,unknown>>();roots=new Map<bigint,Record<string,unknown>>();decisions=new Map<string,Record<string,unknown>>();notes:Record<string,unknown>[]=[];receipts=new Map<string,Receipt>();writes=0;
  key(s:bigint,h:string){return `${s}:${h.toLowerCase()}`;}
  active(s:bigint,h:string){const d=this.decisions.get(this.key(s,h));const root=d&&this.roots.get(integer(d.root_attestation_id));return !!(d?.decision==='ELIGIBLE'&&root&&!root.revoked&&same(root.holder,h)&&same(root.issuer,this.spaces.get(s)?.trusted_issuer));}
  async read(_c:Address,method:Parameters<Transport['read']>[1],args:CalldataEncodable[]){const sid=args[0]===undefined?0n:integer(args[0]);const who=args[1] instanceof CalldataAddress?'0x'+Array.from(args[1].bytes).map(v=>v.toString(16).padStart(2,'0')).join(''):'';
    switch(method){case 'get_counts':return {spaces:BigInt(this.spaces.size),attestations:BigInt(this.roots.size),decisions:BigInt(this.decisions.size),notes:BigInt(this.notes.length)};
      case 'get_space':return this.spaces.get(sid)??{status:'NOT_FOUND'};case 'get_attestation':return this.roots.get(sid)??{status:'NOT_FOUND'};
      case 'get_decision':return this.decisions.get(this.key(sid,who))??{status:'NO_DECISION'};case 'is_active_member':return this.active(sid,who);
      case 'get_room_notes':{const notes=this.notes.filter(n=>integer(n.space_id)===sid);const start=Number(integer(args[1]));return {status:this.spaces.has(sid)?'FOUND':'NOT_FOUND',notes:notes.slice(start,start+Number(integer(args[2]))),total:BigInt(notes.length),next_offset:BigInt(Math.min(start+20,notes.length))};}}
  }
  async write(i:Intent){const a=i.args;let value:unknown=null;let ok=true;
    switch(i.method){case 'create_space':{const sid=BigInt(this.spaces.size+1);this.spaces.set(sid,{status:'FOUND',id:sid,owner:i.account,title:a[0],required_scope:a[1],trusted_issuer:a[2]});value=sid;break;}
      case 'issue_attestation':{const rid=BigInt(this.roots.size+1);this.roots.set(rid,{status:'FOUND',id:rid,issuer:i.account,holder:a[0],label:a[1],source_scope:a[2],revoked:false});value=rid;break;}
      case 'revoke_attestation':{const root=this.roots.get(BigInt(a[0]));if(!root||!same(root.issuer,i.account)||root.revoked)ok=false;else root.revoked=true;break;}
      case 'apply_and_join':{const sid=BigInt(a[0]);const root=this.roots.get(BigInt(a[1]));const s=this.spaces.get(sid);const key=this.key(sid,i.account);if(!root||!s||root.revoked||!same(root.holder,i.account)||!same(root.issuer,s.trusted_issuer)||this.decisions.has(key))ok=false;else{value=s.required_scope==='React UI'?'ELIGIBLE':'NOT_ELIGIBLE';this.decisions.set(key,{status:'FOUND',space_id:sid,holder:i.account,root_attestation_id:BigInt(a[1]),decision:value});}break;}
      case 'post_room_note':{const sid=BigInt(a[0]);if(!this.active(sid,i.account))ok=false;else{value=BigInt(this.notes.length+1);this.notes.push({id:value,space_id:sid,author:i.account,text:a[1]});}break;}}
    const hash='0x'+(++this.writes).toString(16).padStart(64,'0');this.receipts.set(hash,{...receipt(i,value),hash,returnedNormally:ok});return hash;
  }
  async receipt(hash:string){const r=this.receipts.get(hash);if(!r)throw new Error('unknown transaction');return r;}
}
it('F01–F08 offline integration: issue → two spaces → scoped approval/denial → protected post → revoke → blocked post and public history',async()=>{
  const model=new JourneyTransport();const tx=new Transactions(model,{assert:async()=>undefined},storage(),queue(),false);
  const run=async(method:Intent['method'],args:string[],account=owner)=>{await tx.submit({method,args,account,contract});return tx.verify(contract);};
  expect((await run('issue_attestation',[holder,'React UI','Can build React components.'])).returnedId).toBe('1');
  expect((await run('create_space',['React Room','React UI',owner])).returnedId).toBe('1');
  expect((await run('create_space',['Audit Room','Security audit',owner])).returnedId).toBe('2');
  expect((await run('apply_and_join',['1','1'],holder)).stage).toBe('confirmed');
  expect(model.active(1n,holder)).toBe(true);expect(model.active(2n,holder)).toBe(false);
  expect((await run('post_room_note',['1','Hello from a scoped member'],holder)).stage).toBe('confirmed');
  expect((await run('apply_and_join',['2','1'],holder)).stage).toBe('denied');
  expect((await run('post_room_note',['2','No authority here'],holder)).stage).toBe('failed');
  expect((await run('revoke_attestation',['1'])).stage).toBe('confirmed');
  expect(model.active(1n,holder)).toBe(false);
  expect((await run('post_room_note',['1','No authority after revoke'],holder)).stage).toBe('failed');
  const history=record(await model.read(contract,'get_room_notes',[1n,0n,20n]));expect(history.total).toBe(1n);expect(model.notes[0].text).toBe('Hello from a scoped member');
  expect((await run('apply_and_join',['1','1'],holder)).stage).toBe('failed');expect(model.decisions.size).toBe(2);
});
