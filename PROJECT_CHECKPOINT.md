# Phase 4B address compatibility checkpoint

Account: gqzy1, ID 155161534 verified. New branch: phase4b-address-compatibility. A base: daf0bf9a70357fb626b0a8e732826c8db6e0c1fc; B base: 3c9760cf6e1eb444123b9a85296a174fd98b4123. Original branches/PRs/main are unchanged. A/B source SHA256: `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`, byte-identical. Only `_address` changes in production contract; original method ABI, permissions, state machine, frozen prompt and custom consensus remain unchanged.

A 240/240 and B 124/124 offline PASS. No real deployment or transaction in this fix phase. Existing user-reported old deployment is separate from this undeployed patch candidate. A source commit: 7a7078cfb07c1d65faf5db432049a5287ce4f5a6; B packaging commit: 61aac58e0b465a71a0fe3cf4162b1b10f43d1128. Draft PRs: https://github.com/gqzy1/context-bound-attestation-genlayer/pull/3 and https://github.com/gqzy1/contextpass-genlayer/pull/2. Both Draft/open/unmerged, stacked on their original implementation branches. Exact final HEAD is the current PR head; docs-only follow-ups do not change source. Python Strict issues and live raw-calldata uncertainty remain.

Next authorized action: review patch and collect failure transaction calldata/decimal value; consider a separately authorized manual Stable Studionet redeployment with exact candidate source. Do not resume T02–T10 on an assumed patched address. Do not unlock frontend. STOP.

## Historical checkpoint

# PROJECT_CHECKPOINT — ContextPass B

Phase 3 offline product integration completed. Account gqzy1 / 155161534 verified.
Repository: https://github.com/gqzy1/contextpass-genlayer.
Branch: phase3-frontend-integration. Base main bootstrap: 5095cdc5503dda4642c917cfa4576d1286c36319.
Draft PR: https://github.com/gqzy1/contextpass-genlayer/pull/1; Draft/open/unmerged, base main, author gqzy1.
Implementation/evidence commit: ae0bf998e68d3dd589d89f65e93fa172f5cc3668. Later docs-only commit adds actual links; final HEAD is recorded in external report and PR.
Canonical A HEAD: daf0bf9a70357fb626b0a8e732826c8db6e0c1fc, Phase 2 Draft #2 unmerged. A main is not canonical.
Canonical SHA256: 4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec; byte-identical B copy.

Four panels and five real SDK write interfaces implemented with dual compile-time real-write locks. Visitor reads, wallet events/chain61999/refusal, pending ID journal and reload recovery, exact finalized receipt + readback, explicit denial vs unresolved/error, 429/single-flight/rate limit and public note pagination tested offline.

Commands/evidence: python scripts/verify-phase3.py; evidence/phase3/command-results.json and frontend-results.json. **116/116 offline PASS**, 0 failures/pending; TS Strict/default configured check PASS, production build PASS, source hash PASS, copied Python lint/default PASS, raw Python Strict FAIL with unchanged seven upstream diagnostics. Clean cached npm ci succeeded. All locked Phase 0 versions retained.

Unresolved: no real deployed contract/receipt/model/committee convergence or T01–T10; no published Pages; real browser mobile/desktop visual and console QA not run because local URL policy blocked, no workaround. Responsive CSS/component checks do not replace browser QA. Main JS ~778kB/~190.5kB gzip warning retained. Exact JS SDK type declaration bridges documented. No paid dependencies or extra cash.

Frozen invariants unchanged: original trusted issuer, root-only/non-transferable/non-transitive, one decision ever, exact independent custom consensus in unchanged contract, revocation-aware contract posting, public retained history. No frontend result is authoritative. Cached confirmed state is downgraded on restore.

Never merge any PR, transact/deploy, request keys or enter Portal in this phase. A PR #1/#2 and source remain unchanged. Main B remains bootstrap.

**STOP.** Next executor must read all frozen docs, Phase 0/1/2/3 reports, TESTING and this checkpoint, inspect actual heads/PR state, and wait for explicit Phase 4 authorization. Future Phase 4 pre-deployment preparation must STOP for user manual signing per frozen commands. No automatic signing/unlock/publication.
