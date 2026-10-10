import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Wallet, type Provider } from './wallet';
import { SdkTransport, installRpcGuard } from './transport';
import { Transactions } from './transactions';
import './styles.css';
declare global { interface Window { ethereum?:Provider } }
installRpcGuard();
const wallet=new Wallet(window.ethereum);
const transport=new SdkTransport(window.ethereum);
// Manual writes are canonical-target guarded independently in orchestration and SDK transport.
// No wallet connection, signature, submission or polling occurs on startup.
const storage={getItem:(k:string)=>window.localStorage.getItem(k),setItem:(k:string,v:string)=>window.localStorage.setItem(k,v),removeItem:(k:string)=>window.localStorage.removeItem(k)};
const transactions=new Transactions(transport,wallet,storage);
createRoot(document.getElementById('root')!).render(<StrictMode><App wallet={wallet} transactions={transactions}/></StrictMode>);
