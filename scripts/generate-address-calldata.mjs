// Offline fixture generator. No client, signer, network or transaction calls.
import { abi } from 'genlayer-js';
import { CalldataAddress } from 'genlayer-js/types';
const wallets={A:'0xEB56F245EFEceD0899b7e23697FeE512a39DBdCc',B:'0x5EDb6E65aaEA10A7B3CC34e8d5724e41D1f6da84'};
const cases=[];
for(const [wallet,hex] of Object.entries(wallets)){
 const bytes=Uint8Array.from(Buffer.from(hex.slice(2),'hex'));
 for(const [representation,value] of [['Address',new CalldataAddress(bytes)],['int',BigInt(hex)],['bytes',bytes],['str',hex]]){
  const payload=abi.calldata.encode({method:'issue_attestation',args:[value,'React','Can build React components.']});
  cases.push({wallet,hex,representation,decimal:BigInt(hex).toString(),calldataHex:Buffer.from(payload).toString('hex')});
 }
}
process.stdout.write(JSON.stringify({sdk:'genlayer-js 1.1.8',cases},null,2)+'\n');
