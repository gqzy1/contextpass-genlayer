# CURRENT PORTAL SUBMISSION HANDOFF — 2026-10-11

- Post-merge review facts: Repository A PR #6 merged as `59974f62f2ff7b732d034615231d375dbc556637`; Repository B PR #5 merged as `287c2e132cd04e53a4a5b1a8469ca2bb4a13736c`. The B1 test fix is `fbfb786446dbd728d09b122d8759ffaceec598af`.

- Tests: A **240/240 PASS** (latest recorded full offline suite). B **145/145 PASS**, 7/7 files; B TypeScript, source SHA256 verification, build and GitHub Pages deployment all PASS on [ContextPass Pages #3](https://github.com/gqzy1/contextpass-genlayer/actions/runs/38075896135), commit `822645e7c91a8dc4e99eb93daa7f1e83fe9fb22e`.

- Canonical Stable Studionet / Chain ID 61999 contract `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8`; source SHA256 `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`. A / B complete contract copies and deployed source were independently verified byte-identical in Phase 4E.

- Verified live product: https://gqzy1.github.io/contextpass-genlayer/ . One desktop-wallet `create_space` returned Space #3 and was independently rechecked via FINALIZED receipt and readback (tx `0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d`). The other four live frontend writes and certain wallet edge cases are NOT RUN LIVE.

- Limitations retained: seven upstream Python Strict SDK diagnostics; missing archived original PNG/raw bundles; no explicit LICENSE yet; limited mobile signing/rejection/recovery QA; Overview nested Map raw-JSON display issue; bundle-size warning. T07 had one Leader rotation; T08/T10 are accepted **business Rollbacks**, not successful posts.

- **The older 144/145 failure and prior READY FOR REVIEW/Draft/unmerged statements below are historical and superseded after the B1 fix and the approved PR merges.** They remain for audit traceability. No Portal submission is claimed by this header.

---

## Historical review snapshots below (preserved for provenance)

# Phase 4E current review status — 2026-10-10

Canonical source and deployment are on **main**. A audited HEAD `c690a2200569977e99e4cde9bfd52bd86aa4a89e`; B audited HEAD `6a6e8d13c6d73e40c6d185b0918a3e11e786cedc`. Phase 4D merge PRs A #5 / B #4 are already merged. Public hosted demo loaded in Phase 4E and contains the Phase 4D create_space statement.

[Phase 4E audit](PHASE_4E_SUBMISSION_AUDIT.md) is the current submission-readiness decision and fresh test record. This patch is review-only and must not be described as READY FOR SUBMISSION before its unresolved checks are addressed and reviewed. [Live demo](https://gqzy1.github.io/contextpass-genlayer/).

Repository A source and complete B copy are identical: 17,514 bytes; SHA256 `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`; Git blob `10edfd3d23672789b4b600360750f5041c040f6d`. Network Stable Studionet 61999; contract `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8`. Production source and dependency versions are unchanged.

T01–T10 and frontend create_space transaction links were visited: FINALIZED / correct canonical destination. T07 rotation=1; T08/T10 are expected business Rollbacks, not successful writes. Frontend create_space `0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d` independently displays Return 3 in Explorer. This does not establish live testing of the other four website writes, wallet refusal, switching, mobile signing or reload recovery.

Root #1 revoked; Space #1 historical ELIGIBLE is not current authority; Space #2 historical NOT_ELIGIBLE. Space #3 was subsequently created. `spaces=2` is the historical T10 snapshot. Python Strict's seven known SDK diagnostics remain explicit. Neither repo has a LICENSE; licensing decision is pending.

Prior screenshots referenced by Phase 4C/4D are not present in the audited repository trees. Accessible evidence includes A `evidence/phase4c/t01-t10.json`, state/source summaries and original logs; do not claim missing raw archives or screenshot binaries are archived.

Fresh Phase 4E checks: A **240/240** offline PASS; static/default types PASS; raw Python Strict **FAIL (7 diagnostics)**. B **144/145 PASS, 1 FAIL**: the unmodified packaging test still expects frontendRealWalletTested=false; JSON now accurately records the one tested operation as true with explicit partial scope. npm ci/typecheck/verify:source/build PASS. This stale assertion is not changed in this documentation-only patch. **READY FOR REVIEW**, not READY FOR SUBMISSION.

Fresh independent RPC source retrieval matches A/B bytes. Phase 4D raw receipt confirms MAJORITY_AGREE, SUCCESS / Return 3; current SDK + hosted reads confirm Space #3 fields and counts spaces=3 / attestations=1 / decisions=2 / notes=1. See evidence/phase4e and the audit for raw records and limits.

---

## Historical / Superseded — retained verbatim

# ContextPass — live Stable Studionet product (Phase 4D, 2026-10-10)

**[Open live ContextPass demo](https://gqzy1.github.io/contextpass-genlayer/)** · [Repository A](https://github.com/gqzy1/context-bound-attestation-genlayer) · [Phase 4D closure](PHASE_4D_CLOSURE_REPORT.md)

ContextPass is a community-access product built on one scope-bound GenLayer Intelligent Contract. The original issuer attests a holder's specific scope; a space fixes the trusted issuer and immutable requirement; independent Leader/Validators decide admission. Authorization remains space/root/holder-bound and protected posting is revoked when the original root is revoked. Prior public notes and historical decisions remain readable.

**Current facts, overriding historical phase notes below:**

- **Published frontend:** https://gqzy1.github.io/contextpass-genlayer/, deployed by a manually triggered GitHub Pages Actions workflow (first run: Success, 47s, 145/145 tests across 7 files as shown by user screenshots).
- **Network:** Stable Studionet `61999`, `https://studio.genlayer.com/api`. **Canonical contract:** `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8` (deployed in T01, user executed). A/B/deployed SHA256 `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d` was matched in Phase 4C. The historical older contract address is not the canonical write target.
- **Real evidence:** manually executed T01–T10 with previously verified final receipts; user-confirmed hosted desktop read-only flows for both spaces, revoked credential, Room #1 historic ELIGIBLE/current inactive and Room #2 NOT_ELIGIBLE/current inactive. Mobile Overview/My admissions visual and one mobile read-only membership test passed, based on user screenshots. T07 rotated once and did **not** attain first-round agreement; T08/T10 are expected business Rollbacks.
- **One authorized live website write:** `create_space` [tx `0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d`](https://explorer-studio.genlayer.com/transactions/0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d), displayed by the frontend as `confirmed` with `FINALIZED receipt and matching onchain readback verified`; returned Space ID **3**. This is the user's screenshot of frontend verification; independent raw receipt/calldata retrieval and a live post-reload recovery test were not performed in Phase 4D. Do not generalize to the other four live website write methods.
- **Safety:** manual injected-wallet signing only; **canonical address enforced independently in orchestration and SDK transport**; any custom inspected address is read-only; no automatic write retry, signing, or wallet connection at startup.
- **Prior checks:** A 240/240 offline PASS, B 145/145 offline PASS, TypeScript Strict/build/source checks previously PASS. Python Strict **FAIL**, exactly seven pre-existing SDK diagnostics. Current Phase 4D branch does not claim fresh full test/build runs.
- **Status:** earlier PRs merged; Phase 4D review-only PR pending approval; **Portal submissions not yet performed**. No new deployment or contract/protocol/SDK change.

## Reviewer navigation

[Live product](https://gqzy1.github.io/contextpass-genlayer/) · [Current closure](PHASE_4D_CLOSURE_REPORT.md) · [Demo walkthrough (historical with current addendum)](DEMO.md) · [Source provenance](SOURCE_PROVENANCE.md) · [Historical T01–T10 evidence](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md)

---

## Historical README (prior stage claims retained, superseded for current status)

# Phase 4B address compatibility candidate

This branch contains the minimum `_address` normalization fix. Patched SHA256: `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`. Review `PHASE_4B_ADDRESS_COMPATIBILITY_REPORT.md`. The previously reported deployment at `0x97B9003a17A8EDBD1b5E3379AA659753791497d9` uses the old source and is not patched by this PR. T02–T10 remain paused. No deployment, transaction, merge or frontend unlock was performed. Earlier phase reports below remain historical.

# ContextPass

**Trust has context.** A community trusts one original issuer, fixes a scope requirement, and lets the holder apply with an original endorsement. Independent GenLayer Leader/Validators each classify the original scope. Accepted admission is bound to one space, holder and root. Revoke that root and new protected room notes stop; public history remains.

[Phase 3 Draft PR #1](https://github.com/gqzy1/contextpass-genlayer/pull/1) · branch `phase3-frontend-integration` · unmerged.

**Phase 3: offline product integration. Awaiting Onchain Verification.** No deployed contract, real transaction, finalized network consensus or published Pages site is claimed. All production writes are locked. [Phase report](PHASE_3_IMPLEMENTATION_REPORT.md) · [Demo](DEMO.md) · [Tests](TESTING.md) · [Evidence](EVIDENCE_INDEX.md).

## Use locally

```bash
npm ci
npm run dev
npm test
npm run typecheck
npm run verify:source
npm run build
```

Node 24.19.0 / npm 11.9.0. Exact dependencies and all transitive versions are in package-lock.json. React/react-dom 19.3.0, Vite 8.3.4, TypeScript 7.0.2, genlayer-js **1.1.8**, viem 2.57.4, plain CSS. No backend, database, paid API, remote model provider or external fonts.

Production output is dist/, with GitHub Pages base `/contextpass-genlayer/` and hash routes. Pages is **not published**. A manual offline-check workflow is provided; it has not been run on GitHub. No workflow deploys or submits transactions. Publication/configuration remains a separately reviewed later action; this Draft is not merged.

## Four product areas

| Area | User flow | Frozen contract calls |
|---|---|---|
| Overview / Verified Demo | Understand scope coverage, original trust and revocation; inspect a supplied contract | get_counts |
| Spaces | Find by ID, inspect requirement/trusted issuer, prepare immutable creation | get_space, create_space |
| Credentials | Connect/disconnect wallet, read original scope, issue as issuer, acknowledge irreversible revoke | get_attestation, issue_attestation, revoke_attestation |
| My admissions & room notes | Apply once, inspect decision/current membership, page public notes, prepare protected post | apply_and_join, get_decision, is_active_member, get_room_notes, post_room_note |

Visitor mode needs no wallet. No RPC runs on initial load. Supply a contract address for **read-only inspection**, then explicitly request an ID/count/page. A supplied address is not treated as verified canonical deployment evidence. The frozen API has no directory/indexer; the product uses bounded ID lookup rather than an unbounded scan. Notes use pages of 20, with at most 30 per space.

## Real interfaces, offline authorization boundary

`src/transport.ts` calls the actual genlayer-js client readContract/writeContract/getTransaction APIs. Address calldata uses CalldataAddress; IDs use bigint, including uint256 values beyond JavaScript's safe Number range. All reads explicitly select latest-final. Write arguments are exactly the five frozen methods, zero value, leaderOnly=false; no frontend eligibility flag is accepted.

`WRITES_LOCKED=true` is a compile-time Phase 3 boundary, enforced by both transaction orchestration and SDK adapter. There is no URL/env/localStorage unlock. Only tests inject permission for a Mock Transport/test wallet. Do not edit this boundary or send a transaction without new authorization. There is no production mock mode.

Wallet connect requests accounts and chain ID only. Require 61999, and recheck chain/account immediately before signing. A provider guard permits at most one send request per intent, including SDK ABI-fallback attempts. No key generation, imported private account, seed export or automatic chain switch is used.

Transactions persist intent **before** signature, save returned ID, and restore that ID for manual verification. Recovery never trusts a cached confirmed label. Signing with unknown outcome blocks resubmission until a wallet transaction ID is reconciled. Receipt status must be FINALIZED, normally returned, and match hash/sender/recipient/method/encoded arguments. Method-specific finalized readback must match original fields, root binding or the exact returned note. Explicit NOT_ELIGIBLE is a permanent denial; transport errors and unresolved consensus are separate.

Identical reads share one promise; a queue spaces requests by 350 ms. HTTP 429 preserves Retry-After before SDK parsing, including wrapped SDK causes. At most three read attempts, shared cooldown; long Retry-After stops automatic retries. No automatic write retry or polling loop. UI input is escaped, API shapes are checked, and stale selection/wallet reads cannot replace a different membership view.

## Canonical source

A's **main is not canonical**. Source is [Phase 2 commit daf0bf9a70357fb626b0a8e732826c8db6e0c1fc](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/daf0bf9a70357fb626b0a8e732826c8db6e0c1fc/contracts/context_bound_attestation.py), PR #2 still Draft/unmerged. B packages its bytes at intelligent-contract/contracts/context_bound_attestation.py, with no changes.

SHA256: `4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec`.

[Source provenance](SOURCE_PROVENANCE.md) · [Undeployed manifest](DEPLOYMENT_MANIFEST_STUDIONET.md) · [Frozen design](architecture-freeze-v1/02_ARCHITECTURE_FREEZE_V1.md).

## Honest trust and verification limits

A credential is its issuer's assertion, not proof of expertise or issuer honesty. Space owners choose their trusted issuer. Collusion/Sybil resistance, confidentiality and external identity verification are not provided. Admission never becomes a credential, never transfers, never widens source scope, and cannot be retried after a recorded decision, including denial.

All test transactions, model labels and receipts are explicitly scripted offline. Live wallet/browser compatibility, actual multi-Validator convergence, deployed source provenance, finality and T01–T10 are unverified. F09 real desktop/mobile browser visual QA is also unrun: the available browser refused the local build URL under its security policy; no workaround was attempted. Responsive CSS and component behavior have offline checks, not a real browser screenshot claim.

TypeScript strict checking includes dependencies (skipLibCheck=false). Two exact declaration bridges repair missing SDK type references; no diagnostics are globally disabled. The unchanged Python source still has its seven upstream Strict diagnostics (six view decorators plus run_nondet_unsafe); default Python typecheck/lint pass. See TESTING.md.

Extra cash spent: 0. Future faucet test GEN usage and free hosting availability are not guaranteed. **STOP after Phase 3. No merge, deployment, chain transaction, Portal submission or Phase 4 execution.**
