export class RateLimitError extends Error {
  constructor(public retryAfterMs: number) { super('RPC rate limited. Wait before refreshing.'); }
}
export function retryAfter(value: string | null, now=Date.now()): number {
  if (!value) return 1000;
  const seconds = Number(value); const ms = Number.isFinite(seconds) ? seconds*1000 : Date.parse(value)-now;
  return Number.isFinite(ms) ? Math.max(0, ms) : 1000;
}
function rateLimit(error:unknown):RateLimitError|undefined {
  let value=error;const seen=new Set<unknown>();
  for(let i=0;i<8 && value && typeof value==='object' && !seen.has(value);i++){
    if(value instanceof RateLimitError)return value;
    seen.add(value);value=(value as {cause?:unknown}).cause;
  }
}
/** Sequential start spacing, single-flight reads, shared cooldown, bounded retries. Never retries writes. */
export class ReadQueue {
  private inflight = new Map<string,Promise<unknown>>();
  private tail: Promise<unknown> = Promise.resolve();
  private next = 0;
  private cooldown = 0;
  constructor(private delay=(ms:number)=>new Promise<void>(resolve=>setTimeout(resolve,ms)), private now=()=>Date.now(), private spacing=350) {}
  run<T>(key:string, work:()=>Promise<T>): Promise<T> {
    const existing=this.inflight.get(key); if(existing) return existing as Promise<T>;
    const result=this.tail.catch(()=>undefined).then(async()=>{
      for(let attempt=0;attempt<3;attempt++) {
        await this.delay(Math.max(0,Math.max(this.next,this.cooldown)-this.now())); this.next=this.now()+this.spacing;
        try { return await work(); } catch(e) {
          const limited=rateLimit(e);if (!limited) throw e;
          this.cooldown=Math.max(this.cooldown,this.now()+limited.retryAfterMs);
          if(attempt===2 || limited.retryAfterMs>60000) throw limited;
        }
      }
      throw new Error('NETWORK_ERROR');
    });
    this.inflight.set(key,result); this.tail=result;
    void result.finally(()=>this.inflight.delete(key)).catch(()=>undefined); return result;
  }
}
