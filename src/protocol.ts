import { getAddress, hexToBytes, type Address } from 'viem';
import { CalldataAddress, type CalldataEncodable } from 'genlayer-js/types';
export const CHAIN_ID = 61999;
export const RPC = 'https://studio.genlayer.com/api';
export const SOURCE_SHA = 'e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d';
// Phase 4C: reviewed, immutable deployment binding; no URL/env/storage override.
export const CANONICAL_CONTRACT: Address = '0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8';
export const DEPLOYMENT_TRANSACTION = '0x26282c539033879705d9a8dea18c8676dae46c0cd09df9f91cb20d740f9be994';
export const DEMO_HOLDER: Address = '0x5EDb6E65aaEA10A7B3CC34e8d5724e41D1f6da84';
export const WRITES_LOCKED = false; // Activated only with the two canonical-target guards below.
export function assertCanonicalTarget(target: Address): void {
  if (!same(address(target), CANONICAL_CONTRACT)) throw new Error('CANONICAL_TARGET_REQUIRED');
  if (CHAIN_ID !== 61999 || RPC !== 'https://studio.genlayer.com/api' || SOURCE_SHA !== 'e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d') throw new Error('DEPLOYMENT_UNVERIFIED');
}
export type WriteMethod = 'create_space'|'issue_attestation'|'revoke_attestation'|'apply_and_join'|'post_room_note';
export type ReadMethod = 'get_space'|'get_attestation'|'get_decision'|'is_active_member'|'get_room_notes'|'get_counts';
export type Intent = { method: WriteMethod; args: string[]; account: Address; contract: Address };
export function address(value: string): Address {
  if (!/^0x[0-9a-fA-F]{40}$/.test(value) || /^0x0{40}$/i.test(value)) throw new Error('INVALID_ADDRESS');
  return getAddress(value);
}
export function id(value: string): bigint {
  if (!/^[1-9]\d*$/.test(value)) throw new Error('INVALID_ID');
  const n = BigInt(value); if (n >= 2n ** 256n) throw new Error('INVALID_ID'); return n;
}
export function text(value: string, max: number): string {
  if (/[\u0000-\u001f\u007f-\u009f]/u.test(value)) throw new Error('CONTROL_CHARACTER');
  const clean = value.trim(); if (!clean) throw new Error('EMPTY_TEXT');
  if (new TextEncoder().encode(clean).length > max) throw new Error('TEXT_TOO_LONG'); return clean;
}
export function same(a: unknown, b: unknown): boolean { return typeof a === 'string' && typeof b === 'string' && a.toLowerCase() === b.toLowerCase(); }
export function encodedAddress(value: string): CalldataAddress { return new CalldataAddress(hexToBytes(address(value))); }
export function writeArgs(method: WriteMethod, values: string[], account: Address): CalldataEncodable[] {
  const arity = { create_space:3, issue_attestation:3, revoke_attestation:1, apply_and_join:2, post_room_note:2 }[method];
  if (values.length !== arity) throw new Error('INVALID_ARGUMENTS');
  switch(method) {
    case 'create_space': return [text(values[0],80),text(values[1],320),encodedAddress(values[2])];
    case 'issue_attestation': if (same(values[0],account)) throw new Error('SELF_ISSUANCE'); return [encodedAddress(values[0]),text(values[1],80),text(values[2],320)];
    case 'revoke_attestation': return [id(values[0])];
    case 'apply_and_join': return [id(values[0]),id(values[1])];
    case 'post_room_note': return [id(values[0]),text(values[1],240)];
  }
}
export function record(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) throw new Error('INVALID_READBACK');
  if (value instanceof Map) return Object.fromEntries(value) as Record<string, unknown>;
  return value as Record<string, unknown>;
}
export function integer(value: unknown): bigint {
  if (typeof value === 'bigint') return value;
  if (typeof value === 'number' && Number.isSafeInteger(value)) return BigInt(value);
  if (typeof value === 'string' && /^\d+$/.test(value)) return BigInt(value);
  throw new Error('INVALID_READBACK');
}
export function printable(value: unknown): string { return JSON.stringify(value,(_,v: unknown)=>typeof v === 'bigint' ? v.toString() : v,2); }
export function validateRead(method:ReadMethod,value:unknown):unknown {
  const require=(valid:boolean)=>{if(!valid)throw new Error('INVALID_READBACK');};
  if(method==='is_active_member'){require(typeof value==='boolean');return value;}
  const v=record(value);
  if(method==='get_counts'){for(const key of ['spaces','attestations','decisions','notes'])require(integer(v[key])>=0n);return v;}
  if(method==='get_room_notes'){
    require(v.status==='FOUND'||v.status==='NOT_FOUND');require(Array.isArray(v.notes));
    const total=integer(v.total);const next=integer(v.next_offset);require(total>=0n&&total<=30n&&next>=0n&&next<=total&&(v.notes as unknown[]).length<=20);
    for(const item of v.notes as unknown[]){const n=record(item);id(integer(n.id).toString());id(integer(n.space_id).toString());address(String(n.author));require(typeof n.text==='string');}
    require(v.status!=='NOT_FOUND'||(total===0n&&(v.notes as unknown[]).length===0));return v;
  }
  if(method==='get_decision'){
    require(v.status==='FOUND'||v.status==='NO_DECISION');if(v.status==='FOUND'){require(v.decision==='ELIGIBLE'||v.decision==='NOT_ELIGIBLE');id(integer(v.space_id).toString());id(integer(v.root_attestation_id).toString());address(String(v.holder));}return v;
  }
  require(v.status==='FOUND'||v.status==='NOT_FOUND');if(v.status==='NOT_FOUND')return v;
  id(integer(v.id).toString());
  if(method==='get_space'){address(String(v.owner));address(String(v.trusted_issuer));require(typeof v.title==='string'&&typeof v.required_scope==='string');}
  else{address(String(v.issuer));address(String(v.holder));require(typeof v.label==='string'&&typeof v.source_scope==='string'&&typeof v.revoked==='boolean');}
  return v;
}
const messages: Record<string,string> = {
  PHASE3_WRITES_LOCKED:'Real writes are locked. No signature or transaction was requested.',
  CANONICAL_TARGET_REQUIRED:'This inspection target is read-only. Writes require the verified canonical ContextPass contract.',
  DEPLOYMENT_UNVERIFIED:'Deployment binding is invalid. Writing is blocked.',
  WRONG_CHAIN:'Switch your wallet to Stable Studionet (Chain ID 61999).', WALLET_REJECTED:'You declined the wallet request. No approval is recorded.',
  HOLDER_ONLY:'Only the original credential holder may apply.', ISSUER_ONLY:'Only the original issuer may revoke this credential.',
  UNTRUSTED_ISSUER:'This space trusts a different issuer.', ROOT_REVOKED:'The original credential has been revoked.',
  ACTIVE_MEMBER_ONLY:'An active root-bound membership is required to post.', DECISION_EXISTS:'This wallet already has a permanent decision in this space. Retrying with another credential is not allowed.',
  SELF_ISSUANCE:'Issuer and holder must be different wallets.', ALREADY_REVOKED:'This credential is already revoked.',
  SUBMISSION_UNKNOWN:'The submission outcome is unknown. Do not submit again; reconcile the wallet transaction first.',
  INVALID_READBACK:'The finalized state did not match this transaction. Confirmation is withheld.',
  PENDING_EXISTS:'A saved transaction needs verification before another write.', NETWORK_ERROR:'The network request failed. This is not a NOT_ELIGIBLE decision.',
  STORAGE_UNAVAILABLE:'Transaction recovery storage is unavailable. Writing is blocked.',
};
export function friendly(error: unknown): string {
  const e = error as {code?:number;message?:string;cause?:unknown};
  if (e?.code === 4001) return messages.WALLET_REJECTED;
  const message = e?.message ?? String(error);
  return Object.entries(messages).find(([code])=>message.includes(code))?.[1] ?? message;
}
