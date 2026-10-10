import { describe,it,expect } from 'vitest';
import { abi } from 'genlayer-js';
import { CalldataAddress } from 'genlayer-js/types';
import { encodedAddress,WRITES_LOCKED,writeArgs } from '../src/protocol';
import { getAddress,hexToBytes } from 'viem';
const A='0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc';
const B='0x5EDb6E65aaEA10A7B3CC34e8d5724e41D1f6da84';
describe.each([A,B] as const)('pinned SDK address wire compatibility %s',(wallet)=>{
 it('production encoding retains the address marker and exact 20 bytes',()=>{
  const decoded=abi.calldata.decode(abi.calldata.encode(encodedAddress(wallet)));
  expect(decoded).toBeInstanceOf(CalldataAddress);
  expect((decoded as CalldataAddress).bytes).toEqual(hexToBytes(wallet));
  expect(WRITES_LOCKED).toBe(true);
 });
 it('plain numeric calldata remains bigint rather than becoming an address',()=>{
  expect(abi.calldata.decode(abi.calldata.encode(BigInt(wallet)))).toBe(BigInt(wallet));
 });
 it('bytes and string calldata preserve their separate representations',()=>{
  expect(abi.calldata.decode(abi.calldata.encode(hexToBytes(wallet)))).toEqual(hexToBytes(wallet));
  expect(abi.calldata.decode(abi.calldata.encode(wallet))).toBe(wallet);
 });
 it('self-issuance rejects address casing aliases before SDK write dispatch',()=>{
  expect(()=>writeArgs('issue_attestation',[wallet.toLowerCase(),'React','scope'],getAddress(wallet))).toThrow('SELF_ISSUANCE');
 });
});
