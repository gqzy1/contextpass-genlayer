# ContextPass — Projects submission preparation (Phase 4D, NOT SUBMITTED)

**Product name:** ContextPass  
**Public demo:** https://gqzy1.github.io/contextpass-genlayer/  
**Product code:** https://github.com/gqzy1/contextpass-genlayer  
**Independent Intelligent Contract:** https://github.com/gqzy1/context-bound-attestation-genlayer  
**Network:** Stable GenLayer Studionet, Chain ID 61999, RPC https://studio.genlayer.com/api  
**Canonical contract:** `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8`  
**Contract source SHA256 (Phase 4C match):** `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`  
**Status:** Prepared, not entered or submitted in the Portal.

## What ContextPass solves

A community endorsement for one skill should not automatically grant access to unrelated roles. ContextPass binds each admission to an **original issuer-owned root attestation**, a specific holder, a space's fixed trusted issuer, and the space's immutable entry requirement. The intelligent contract evaluates whether the original stated scope covers the exact requirement, without inflating it to broader authority. Once the root is revoked, protected posting stops while prior admission decisions and public notes remain inspectable.

## Why GenLayer is essential

Human wording differences require semantic entailment rather than exact string matching. The contract employs a custom nondeterministic Leader/Validator boundary: independent classification by Leader and Validators of original source/target, strict canonical decision parsing and exact-label equivalence; deterministic rules independently check holder, issuer, revoked state, one decision per space/holder, and posting permissions. The product is not an LLM wrapper or an offchain frontend judgment.

## Product flow and trust boundaries

- **Overview:** narrative and explicitly marked illustration versus verified deployed example; manual fresh final-state reads and Explorer evidence links.
- **Spaces:** lookup immutable entry rules, issuer and owner by ID; canonical-only manually signed creation.
- **Credentials:** issuer issues original-scope attestations; public readers inspect; issuer-only irreversible revocation.
- **My admissions:** apply once, read historical verdict separately from current active membership, publish public notes only when live root-bound membership remains valid.

Visitor reads require no wallet. Signatures are explicit and user-controlled; no automatic chain switch or sending, no keys collected, and noncanonical inspection addresses never become writable. Public history is **not confidential** and a credential is an issuer assertion, not a certified proof of skill/identity. Sybil/collusion resistance is not claimed.

## Actual network and browser evidence

1. **Studio T01–T10:** user-manual authentic chain actions, receipts and final-state checks. Index: https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md. T04 room 1: historical `ELIGIBLE` followed by root revocation T09, current active membership `false`. T07 room 2: `NOT_ELIGIBLE` after one Leader rotation / initial parse/disagreement. T08/T10: expected `ACTIVE_MEMBER_ONLY` Rollback, not successful writes. Room 1's earlier public note persists; room 2 has none.
2. **Public hosted QA:** GitHub Pages workflow screenshot `Success` after 47 seconds and 145/145 tests; desktop loads/reads the verified example, both room IDs, the revoked credential, two history verdicts, active status and notes; desktop wallet connects; mobile Overview/My admissions visually render and mobile Room 1 public admission reads. Evidence: user-provided screenshots in this ChatGPT conversation, not yet binary-uploaded to the repo.
3. **One live production-web frontend write:** `create_space` tx [`0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d`](https://explorer-studio.genlayer.com/transactions/0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d). User screenshot: `Saved transaction · confirmed`, `FINALIZED receipt and matching onchain readback verified`, returned new Space #3. Exact raw receipt/validator ballots not independently retrieved in this closure. The other four methods were **not independently tested by signing from Pages**.
4. **Prior automated validation:** A 240/240 offline PASS; B 145/145 offline PASS; original GitHub Pages action 145/145 PASS. Existing Python Strict **FAIL** (seven upstream SDK typing diagnostics) retained. Bundle-size warning retained. No fresh complete suite was run for the Phase 4D PR before independent review.

## Known gaps (state explicitly during review)

- Independent live Explorer/RPC inspection of the Phase 4D transaction hash and exact Space #3 details remains to be collected; its presented receipt/readback is the **deployed frontend's** check.
- Live wallet rejection, wrong-chain/account-change edge cases, confirmed transaction post-reload recovery, mobile signed writes, and all remaining four actual Pages write methods not verified; offline tests exist.
- Normal browser console/network sweep not formally archived; mobile coverage limited to supplied screenshots.
- Python Strict seven SDK upstream typing diagnostics still present. Do not claim all checks green.
- Historical post-T10 `spaces=2` snapshot predates new Space #3.

## Final reviewer checklist

- Confirm public visibility of A/B repos and live Demo; inspect current main **after PR merge**.
- Review/merge this Phase 4D documentation and website-copy PR only after explicit authorization; rerun B tests/typecheck/source verification/build and republish Pages manually after merge, then capture website copy.
- Optionally read `get_space(3)`, transaction/Validator details and formal browser console audit, without issuing new transactions.
- Upload/attach curated original browser + transaction screenshots in Portal if requested; screenshots are currently referenced, **not falsely claimed as repository files**.
- Read the actual Portal categories/fields at submission time; do not presuppose category acceptance. **Do not submit or assert approval without explicit user direction.**

## Evidence navigation

[Closure details](PHASE_4D_CLOSURE_REPORT.md) · [Demo](DEMO.md) · [A T01–T10 index](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md) · [Deployment](DEPLOYMENT_MANIFEST_STUDIONET.md).
