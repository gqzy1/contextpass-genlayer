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
