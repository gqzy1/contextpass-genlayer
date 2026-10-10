import { it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SOURCE_SHA,WRITES_LOCKED } from '../src/protocol';
it('canonical contract bytes match the exact reviewed candidate SHA256',()=>{expect(createHash('sha256').update(readFileSync('intelligent-contract/contracts/context_bound_attestation.py')).digest('hex')).toBe(SOURCE_SHA);});
it('F10 Vite GitHub Pages base is the Repository B project path',()=>{expect(readFileSync('vite.config.ts','utf8')).toContain("base: '/contextpass-genlayer/'");});
it('F09 CSS provides desktop/mobile layouts and visible keyboard focus',()=>{const css=readFileSync('src/styles.css','utf8');expect(css).toContain('@media(max-width:680px)');expect(css).toContain('grid-template-columns:1fr');expect(css).toContain(':focus-visible');});
it('exact dependency lock pins genlayer-js and Phase 0 frontend versions',()=>{const pkg=JSON.parse(readFileSync('package.json','utf8'));const lock=JSON.parse(readFileSync('package-lock.json','utf8'));for(const [name,version] of Object.entries(pkg.dependencies))expect(lock.packages[`node_modules/${name}`].version).toBe(version);expect(pkg.dependencies['genlayer-js']).toBe('1.1.8');});
it('Activated production contains no runtime write-unlock environment option',()=>{expect(WRITES_LOCKED).toBe(false);expect(readFileSync('src/main.tsx','utf8')).not.toContain('import.meta.env');expect(readFileSync('src/App.tsx','utf8')).not.toContain('MockTransport');});
it('production manifest and compiled canonical target bind the same verified deployment',async()=>{
  const {CANONICAL_CONTRACT,DEPLOYMENT_TRANSACTION,CHAIN_ID,RPC}=await import('../src/protocol');
  const m=JSON.parse(readFileSync('public/deployment-manifest.json','utf8'));
  expect(m.contractAddress).toBe(CANONICAL_CONTRACT);
  expect(m.deploymentTransactionId).toBe(DEPLOYMENT_TRANSACTION);
  expect(m.chainId).toBe(CHAIN_ID);
  expect(m.rpc).toBe(RPC);
  expect(m.sourceSha256).toBe(SOURCE_SHA);
  expect(m.verifiedEvidence).toHaveLength(10);
  expect(m.frontendRealWalletTested).toBe(true);
  expect(m.frontendRealWalletTestScope).toBe('Desktop connection and one create_space only; does not mean all writes or edge cases passed');
  expect(m.frontendWriteSmokeTests.create_space).toMatchObject({
    transactionId:'0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d',
    status:'FINALIZED',
    spaceId:3,
  });
  expect(m.verifiedObjectIds.frontendCreatedSpace).toBe(3);
  expect(Object.keys(m.frontendWriteSmokeTests).sort()).toEqual([
    'apply_and_join','create_space','issue_attestation','post_room_note','revoke_attestation',
  ]);
  for(const method of ['issue_attestation','apply_and_join','post_room_note','revoke_attestation']){
    expect(m.frontendWriteSmokeTests[method]).toBe('NOT RUN VIA LIVE FRONTEND');
  }
  expect(m.frontendWalletEdgeCaseTests).toEqual({
    refusal:'NOT RUN LIVE',
    wrongChainAndAccountChanges:'NOT RUN LIVE',
    reloadAndUnknownOutcomeRecovery:'NOT RUN LIVE',
    mobileSigning:'NOT RUN',
  });
  expect(m.recordedSnapshot.room1HistoricalDecision).toBe('ELIGIBLE');
  expect(m.recordedSnapshot.room1Active).toBe(false);
});
