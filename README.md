# ContextPass

**Trust has context.** A credential for one skill should not be treated as permission to perform every task.

ContextPass is a published GenLayer application that uses an independent Intelligent Contract to make **scope-bound community admission decisions**. It binds an original issuer's attestation to a holder, each space's immutable requirements and trusted issuer, and the result of a custom independent Leader/Validator semantic evaluation. A decision is local to one space and cannot be reused as a transferable credential. Revoking the original attestation blocks future protected posts while preserving historical decisions and public notes.

**[Launch ContextPass](https://gqzy1.github.io/contextpass-genlayer/)** · **[Five-minute live demo](DEMO.md)** · **[Contract source](intelligent-contract/contracts/context_bound_attestation.py)** · **[Onchain evidence](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md)**

## How it works

1. **Define a space.** Its owner sets a title, immutable entry requirement and trusted credential issuer.
2. **Issue a scoped attestation.** The issuer records an original scope for a specific holder; this is an issuer statement, not verified external expertise.
3. **Apply once.** The contract validates issuer, holder, scope, revocation status and duplicate-decision rules. GenLayer Leader and Validators independently classify whether the original scope covers the entire space requirement, and compare canonical `ELIGIBLE` / `NOT_ELIGIBLE` labels.
4. **Use only active admission.** Protected notes require live, root-bound membership, which the contract rechecks on every post. Revoking the original root immediately removes derived posting permission; previously posted notes and historical decisions remain available.

The semantic judgment is performed **inside the GenLayer Intelligent Contract's consensus flow**, not by a frontend label or offchain eligibility shortcut. Leader/Validator independence and exact-label equivalence are documented in [CONSENSUS.md](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/CONSENSUS.md).

## Live app features

| Area | What you can do |
| --- | --- |
| **Overview** | Understand the mechanism; refresh a real finalized onchain example without a wallet |
| **Spaces** | Read existing spaces by ID and inspect immutable requirements; create a space with explicit signing |
| **Credentials** | Read original attestations, issue a scoped credential or revoke it as issuer |
| **My admissions** | Apply to a specific space; read historical decisions and current membership separately; inspect and publish public room notes |

Readers may inspect real chain state without connecting a wallet. Writes require an explicit injected-wallet signature on Stable Studionet (Chain ID 61999). A manually entered alternative contract address is for **read-only inspection only**; write access remains restricted to the verified canonical contract.

## Reproducible live evidence

**Network:** Stable GenLayer Studionet · Chain ID `61999` · RPC `https://studio.genlayer.com/api`  
**Canonical contract:** `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8` · [Explorer](https://explorer-studio.genlayer.com/address/0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8)  
**Production source SHA256:** `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`

Manually executed Studio T01–T10 exercises contract deployment, issuance, space creation, positive and negative semantic admission, successful posting, root revocation and protected-post rejection. In particular:

- Space **#1** (React Components): historical `ELIGIBLE`, but **currently inactive** after Root #1 revocation.
- Space **#2** (Security Audit): historical `NOT_ELIGIBLE`, with no active membership.
- **T07:** a negative semantic decision after **one Leader rotation**.
- **T08 / T10:** consensus-finalized transactions with expected **business Rollback / ACTIVE_MEMBER_ONLY**; these were rejected writes, not successful posts.
- **One real published-frontend write:** wallet-signed [`create_space`](https://explorer-studio.genlayer.com/tx/0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d) is FINALIZED / SUCCESS with return ID **3**. A subsequent read confirmed Space #3.

[Walk through the live state](DEMO.md) · [T01–T10 receipt index](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md) · [Frontend receipt details](evidence/phase4e/frontend-tx-summary.json) · [Recorded state readback](evidence/phase4e/sdk-current-readback.json)

The state counts in evidence files are snapshots taken at the stated timestamps; they are not static application guarantees.

## Source and architecture

This repository includes the **entire original Intelligent Contract**, byte-identical to the standalone contract repository and verified against the deployed source:

- [Complete embedded Python contract](intelligent-contract/contracts/context_bound_attestation.py)
- [Independent contract repository](https://github.com/gqzy1/context-bound-attestation-genlayer)
- [Source integrity and origin](SOURCE_PROVENANCE.md)
- [Studionet deployment manifest](DEPLOYMENT_MANIFEST_STUDIONET.md)
- [Current app deployment metadata](public/deployment-manifest.json)

The frontend is React + TypeScript + Vite, using `genlayer-js` for chain reads and manually signed writes. Core access decisions are enforced by contract logic; the client separates recorded historical admission from current usable permission. Canonical-only write guards, wallet/network checks, transaction finality and readback verification protect the write path.

## Run and verify locally

Requires a compatible Node.js / npm environment (validated with Node 24.19.0 and npm 11.9.0).

```bash
npm ci
npm test
npm run typecheck
npm run verify:source
npm run build
npm run dev
```

The last recorded complete frontend suite passed **145/145 tests** across 7 files; the build, TypeScript typecheck and source verification also passed. The independent contract repository's latest recorded offline suite passed **240/240 tests**. Detailed command outputs and exact scope are in [test results](evidence/phase4e-b1/command-results.json) and [TESTING.md](TESTING.md).

## Scope, trust and verification limits

- `create_space` was signed and verified through the production website once. The website's other four write flows were **not separately exercised with a real signing wallet**; their contract-side behavior is supported by Studio test transactions and offline tests. Wallet-refusal, wrong-chain/account switching, reload recovery and mobile signing do not have comprehensive live QA coverage.
- The pinned Python SDK's strict checker reports **seven existing upstream type diagnostics**; standard lint/default typecheck and the recorded offline tests passed. The frontend build retains its bundle-size warning. A known nested-JSON display issue in the Overview inspection interface is recorded in the audit.
- Historical screenshots and some original raw evidence bundles referenced in past phase records were not available as repository files at audit time. Existing JSON evidence and public Explorer transaction pages are linked directly.
- The project currently has **no explicit LICENSE file**. Public source access is not a grant of unrestricted reuse; licensing must be decided separately.
- Attestations are issuer assertions, **not proof of human identity, personal expertise, absence of collusion or Sybil resistance**. Credentials and room notes are publicly readable; this is not private messaging.

For independent verification, see the [demo walkthrough](DEMO.md), [Projects evidence guide](SUBMISSION_PROJECTS.md) and [historical Phase 4E audit](PHASE_4E_SUBMISSION_AUDIT.md). Earlier phase notes and commit history remain available for technical provenance; current usage and status are described here.
