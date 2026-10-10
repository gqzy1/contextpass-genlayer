# Current Stable Studionet deployment manifest — Phase 4E

| Field | Current evidence-backed value |
|---|---|
| Deployment status | DEPLOYED; T01 FINALIZED / Accepted / SUCCESS / Return |
| Network / Chain / RPC | Stable Studionet / 61999 / https://studio.genlayer.com/api |
| Canonical contract | `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8` |
| Deployment transaction | `0x26282c539033879705d9a8dea18c8676dae46c0cd09df9f91cb20d740f9be994` |
| Current A source main HEAD (audited) | `c690a2200569977e99e4cde9bfd52bd86aa4a89e` |
| Current B main HEAD (audited) | `6a6e8d13c6d73e40c6d185b0918a3e11e786cedc` |
| Source SHA256 / Git blob | `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d` / `10edfd3d23672789b4b600360750f5041c040f6d` |
| Source provenance | A `contracts/context_bound_attestation.py`; complete B `intelligent-contract/contracts/context_bound_attestation.py`; 17,514 identical bytes |
| Historical deployment-source baseline | Phase 4B `c7c6e50620602d03ad4e3c116ad1532097feab8a`; merged into main |
| GenVM / SDK / constructor / ABI | v0.2.16 / original Depends; genlayer-js 1.1.8 / zero arguments / five writes + six reads |
| Studio E2E | T01–T10 genuine prior execution; FINALIZED visible in Phase 4E Explorer review; T07 rotation 1; T08/T10 expected ACTIVE_MEMBER_ONLY Rollback |
| Published frontend | https://gqzy1.github.io/contextpass-genlayer/ ; live page loaded independently in Phase 4E |
| Wallet / browser coverage | Prior user-confirmed desktop connect + one signed create_space; desktop and partial mobile read/visual coverage; not full browser QA |
| Frontend create_space | `0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d`; Explorer independently shows FINALIZED / Accepted / SUCCESS / Return 3 in Phase 4E |
| Other website writes / refusal / reload recovery / mobile signing | NOT RUN live; Studio evidence and offline mocks do not prove website coverage |
| Frontend write target | Canonical only; writes activated with independent orchestration/transport guards |
| Portal | No submission performed by Phase 4E |

Root #1 is revoked. Space #1's historical ELIGIBLE grants no current posting permission; Space #2 recorded NOT_ELIGIBLE. Space #3 is the later frontend-created object. The Phase 4C `spaces=2` snapshot is historical. Historical raw logs/results are retained, not overwritten. See `PHASE_4E_SUBMISSION_AUDIT.md` for fresh command results and outstanding limits. Python Strict has seven known SDK diagnostics; do not claim every check PASS.

Explorer audit: each of T01–T10 and Phase 4D `/transactions/<hash>` redirected to a matching `/tx/<hash>` detail page. Existing URLs are functional; no speculative bulk replacement.

No contract code, SDK, lockfile, ABI, prompt, state or authorization change; no transaction, deployment, merge, Pages publication or Portal action in Phase 4E.

Phase 4E fresh source RPC: deployed bytes equal A/B (same SHA256/blob). Raw frontend transaction receipt + unchanged SDK decode confirm Return 3, MAJORITY_AGREE, 3 agree / 2 idle. Fresh latest-final SDK/hosted reads confirm Space #3 title, requirement, owner and issuer, and counts 3/1/2/1 (spaces/attestations/decisions/notes). Read-only only. Fresh tests: A 240/240 PASS; static/default PASS; Strict FAIL 7. B 144/145 PASS plus one stale metadata expectation FAIL; install/types/source/build PASS.

---

## Historical / Superseded — retained verbatim

# Stable Studionet deployment manifest — NOT DEPLOYED

| Field | Authoritative value |
|---|---|
| State | NOT_DEPLOYED / Awaiting Onchain Verification |
| Network | Stable GenLayer Studionet only |
| Chain ID | 61999 |
| RPC | https://studio.genlayer.com/api |
| Explorer | https://explorer-studio.genlayer.com/ |
| Contract address / deployment ID | Not supplied; null in public manifest |
| Canonical source HEAD | daf0bf9a70357fb626b0a8e732826c8db6e0c1fc |
| Canonical source SHA256 | 4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec |
| Contract path | intelligent-contract/contracts/context_bound_attestation.py |
| GenVM | v0.2.16 with unchanged pinned Depends runner |
| Constructor | Zero arguments |
| JavaScript SDK | genlayer-js 1.1.8 |
| Finalized evidence / real model results | None; NOT RUN |
| GitHub Pages | Prepared project base/hash routing, NOT PUBLISHED |

No prefilled address, transaction hash, room/root ID or validator outcome is a production example. Test fixtures use clearly offline synthetic values only. Manually entered read-only targets do not establish provenance. All real writes remain compile-time locked in Phase 3.

After separate authorization, Phase 4 should recheck stable environment, re-run offline checks, prepare the exact manual Studio execution package, then STOP for the user's manually signed actions as specified in the frozen phase commands. Do not execute these steps now. Actual receipts, source matching, IDs, two-space admission/denial and revocation-enforced posting evidence must be recorded before any verified demo claim or Portal submission. No private key/seed is needed or requested.
