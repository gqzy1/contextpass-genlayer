import { address, CHAIN_ID } from './protocol';
import type { Address } from 'viem';
export interface Provider { request(args:{method:string;params?:unknown[]}):Promise<unknown>; on?(name:string,fn:(value:unknown)=>void):void; removeListener?(name:string,fn:(value:unknown)=>void):void }
export type WalletState = {account?:Address; chainId?:number; connecting:boolean; error?:string};
export class Wallet {
  state: WalletState={connecting:false}; private listeners=new Set<()=>void>(); private epoch=0;
  constructor(public provider?:Provider) { provider?.on?.('accountsChanged',this.accounts); provider?.on?.('chainChanged',this.chain); provider?.on?.('disconnect',this.disconnect); }
  subscribe=(fn:()=>void)=>{this.listeners.add(fn);return ()=>{this.listeners.delete(fn);};};
  snapshot=()=>this.state;
  private update(value:WalletState){this.state=value;this.listeners.forEach(fn=>fn());}
  private accounts=(value:unknown)=>{try{const a=Array.isArray(value)&&value[0]?address(String(value[0])):undefined;
    if(this.state.connecting&&a){this.update({...this.state,account:a});return;}
    this.epoch++;this.update({...this.state,account:a,connecting:false});}catch{this.disconnect();}};
  private chain=(value:unknown)=>{this.epoch++;const n=Number(value);this.update({...this.state,chainId:Number.isSafeInteger(n)?n:undefined,connecting:false});};
  disconnect=()=>{this.epoch++;this.update({connecting:false});}; // app disconnect; wallet permission stays user-controlled.
  async connect(){if(!this.provider){this.update({connecting:false,error:'No injected wallet found. Visitor reads still work.'});return;}
    const token=++this.epoch;this.update({connecting:true});
    try{const accounts=await this.provider.request({method:'eth_requestAccounts'});const chainId=Number(await this.provider.request({method:'eth_chainId'}));
      if(token!==this.epoch)return;
      this.update({account:this.state.account??(Array.isArray(accounts)&&accounts[0]?address(String(accounts[0])):undefined),chainId,connecting:false});
    }catch(e){if(token===this.epoch)this.update({connecting:false,error:(e as {code?:number}).code===4001?'WALLET_REJECTED':'Wallet connection failed.'});}}
  async assert(account:Address){if(!this.provider||this.state.account?.toLowerCase()!==account.toLowerCase())throw new Error('Connect the intended wallet first.');
    const chain=Number(await this.provider.request({method:'eth_chainId'}));if(chain!==CHAIN_ID)throw new Error('WRONG_CHAIN');
    const accounts=await this.provider.request({method:'eth_accounts'});if(!Array.isArray(accounts)||String(accounts[0]).toLowerCase()!==account.toLowerCase())throw new Error('Wallet changed. Reconnect before writing.');}
  dispose(){this.provider?.removeListener?.('accountsChanged',this.accounts);this.provider?.removeListener?.('chainChanged',this.chain);this.provider?.removeListener?.('disconnect',this.disconnect);this.listeners.clear();}
}
