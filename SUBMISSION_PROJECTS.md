# ContextPass — Product Overview and Verification

**Live app:** https://gqzy1.github.io/contextpass-genlayer/  
**App source:** https://github.com/gqzy1/contextpass-genlayer  
**Standalone contract:** https://github.com/gqzy1/context-bound-attestation-genlayer  
**Network:** GenLayer Stable Studionet · Chain ID `61999`  
**Deployed contract:** [View in Explorer](https://explorer-studio.genlayer.com/address/0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8)

## Product in one sentence

ContextPass grants context-specific community access based on original, issuer-backed attestations, using independent GenLayer semantic consensus and revocation-aware permissions.

## Problem and use case

A credential attesting that a person can build React components does not establish that they can audit production authentication infrastructure. Ordinary reusable role badges can silently expand a narrow endorsement into wider authority.

ContextPass makes **each admission dependent on the original attested scope and a specific space's requirements**. A space owner chooses a trusted issuer and fixes a requirement. An issuer records a scope-limited credential for a holder. The holder can apply once for a specific space; contract validators independently decide whether the scope fully covers the requirement, and the accepted decision belongs only to that space, holder and credential. Revocation removes the derived right to post, without erasing public history.

## Why GenLayer is essential

Meaningful requirements are written in natural language, so keyword or string equality is insufficient. The contract employs custom GenLayer nondeterministic Leader/Validator execution: all parties independently classify the same original scope and target requirement using the pinned evaluation prompt, parse strict canonical decisions, and compare the actual `ELIGIBLE` / `NOT_ELIGIBLE` label. Deterministic authorization rules validate issuer, holder, revocation, uniqueness and protected-note permissions.

The app does not simulate this result in the browser and does not substitute a generic offchain LLM call for actual GenLayer execution. Read the [contract source](intelligent-contract/contracts/context_bound_attestation.py) and [consensus explanation](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/CONSENSUS.md).

## How to try the published product

Start with the [five-minute read-only walkthrough](DEMO.md). It covers Space **#1** (React Components), Space **#2** (Security Audit), original Root **#1**, historical positive/negative admission outcomes, post-revocation inactive membership and surviving public history. No wallet or new transaction is needed.

For optional real interactions, the site offers space creation, original credential issuance, admission, protected notes and revocation. All onchain writes require an explicit wallet signature and a verified canonical contract target. The read-only tour is sufficient to assess the recorded example without spending test GEN.

## Reproducible evidence

| Evidence | Link | Meaning |
| --- | --- | --- |
| Live interactive application | [Open ContextPass](https://gqzy1.github.io/contextpass-genlayer/) | Public, hosted frontend, read-only verification and wallet connection |
| Complete embedded Intelligent Contract | [Python source](intelligent-contract/contracts/context_bound_attestation.py) | Exact deployed production source, not a stub or wrapper |
| Source authenticity | [Provenance](SOURCE_PROVENANCE.md) · [Manifest](DEPLOYMENT_MANIFEST_STUDIONET.md) | A/B/deployed byte consistency, SHA256 `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d` |
| T01–T10 real Studio execution | [Chain receipt index](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md) | Positive/negative admission, validator rotation, revocation and expected business Rollbacks |
| Real frontend wallet signature | [FINALIZED create_space transaction](https://explorer-studio.genlayer.com/tx/0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d) · [Decoded record](evidence/phase4e/frontend-tx-summary.json) | Returned Space ID **3** with independent transaction verification |
| Subsequent verified onchain read | [State readback](evidence/phase4e/sdk-current-readback.json) | `get_space(3)` FOUND; last recorded count snapshot shows 3 spaces |
| Frontend engineering checks | [Command results](evidence/phase4e-b1/command-results.json) | `npm test` 145/145 PASS, typecheck/source verify/build successful |
| Standalone contract validation | [Contract tests and evidence](https://github.com/gqzy1/context-bound-attestation-genlayer) | Latest recorded 240/240 offline tests; independent consensus source |

**Important distinctions:** Space #1's historical `ELIGIBLE` verdict remains onchain but confers **no current posting right** after Root #1 revocation. Space #2's `NOT_ELIGIBLE` is a valid decision. T08/T10 finalized onchain but are **rejected business writes** (`ACTIVE_MEMBER_ONLY` Rollback), not successful posts.

## Build and inspect the implementation

```bash
npm ci
npm test
npm run typecheck
npm run verify:source
npm run build
npm run dev
```

Further technical explanation is in [README](README.md), [testing](TESTING.md), [source provenance](SOURCE_PROVENANCE.md) and the [deployment manifest](DEPLOYMENT_MANIFEST_STUDIONET.md).

## Evidence boundaries

The recorded live-frontend smoke test covers one wallet-signed **`create_space`** transaction, not all five write methods. Other writes have Studio onchain evidence and offline tests, but no equivalent individual published-website signing QA. Wallet rejection, chain/account switching, reload recovery and mobile signing are not comprehensively live-verified. The Python SDK's strict typecheck retains seven upstream diagnostics; a frontend bundle-size warning and a minor nested-JSON display issue also remain. Some past PNG/raw archive references cannot be backed by files in this repository. The repository has no explicit LICENSE file yet.

All evidence should be interpreted at its stated date and test scope. This is an issuer-based credential and admission tool, **not an independent identity-verification, real-world skill certification, anti-Sybil or confidential messaging system**.

[Full implementation notes](README.md) · [Current product walkthrough](DEMO.md) · [Historical independent audit trail](PHASE_4E_SUBMISSION_AUDIT.md)

## Submission link housekeeping

Each evidence URL should be used only once in the Portal's dedicated evidence-link fields if that interface enforces duplicate avoidance. The **website** and **contract address** fields may reference the same destinations for their own purposes. Evidence links in this document are navigation aids and do not imply that each must be pasted as a separate Portal evidence entry.
