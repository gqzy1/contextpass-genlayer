# Phase 4E current review status — 2026-10-10

Canonical source and deployment are on **main**. A audited HEAD `c690a2200569977e99e4cde9bfd52bd86aa4a89e`; B audited HEAD `6a6e8d13c6d73e40c6d185b0918a3e11e786cedc`. Phase 4D merge PRs A #5 / B #4 are already merged. Public hosted demo loaded in Phase 4E and contains the Phase 4D create_space statement.

[Phase 4E audit](PHASE_4E_SUBMISSION_AUDIT.md) is the current submission-readiness decision and fresh test record. This patch is review-only and must not be described as READY FOR SUBMISSION before its unresolved checks are addressed and reviewed. [Live demo](https://gqzy1.github.io/contextpass-genlayer/).

Repository A source and complete B copy are identical: 17,514 bytes; SHA256 `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`; Git blob `10edfd3d23672789b4b600360750f5041c040f6d`. Network Stable Studionet 61999; contract `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8`. Production source and dependency versions are unchanged.

T01–T10 and frontend create_space transaction links were visited: FINALIZED / correct canonical destination. T07 rotation=1; T08/T10 are expected business Rollbacks, not successful writes. Frontend create_space `0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d` independently displays Return 3 in Explorer. This does not establish live testing of the other four website writes, wallet refusal, switching, mobile signing or reload recovery.

Root #1 revoked; Space #1 historical ELIGIBLE is not current authority; Space #2 historical NOT_ELIGIBLE. Space #3 was subsequently created. `spaces=2` is the historical T10 snapshot. Python Strict's seven known SDK diagnostics remain explicit. Neither repo has a LICENSE; licensing decision is pending.

Prior screenshots referenced by Phase 4C/4D are not present in the audited repository trees. Accessible evidence includes A `evidence/phase4c/t01-t10.json`, state/source summaries and original logs; do not claim missing raw archives or screenshot binaries are archived.

---

## Historical / Superseded — retained verbatim

# Current live demo walkthrough — Phase 4D (2026-10-10)

Live URL: https://gqzy1.github.io/contextpass-genlayer/. This is a newer addendum; the preserved historical guide below describes Phase 3 before publication and must not be taken as the current release status.

1. Open Overview as visitor. Click `Refresh verified example · read only`: root #1 revoked, Room #1 historical ELIGIBLE/currently inactive, Room #2 NOT_ELIGIBLE/currently inactive, note history preserved.
2. In Spaces, read ID 1 (React Components) and ID 2 (Security Audit); do not create extra review transactions.
3. In Credentials, read root ID 1, showing issuer A, holder B, original React scope, `revoked=true`.
4. In My admissions, read wallet B against Room #1 and #2, compare historical decision with current membership, read public room notes (Room #1 one note, Room #2 empty).
5. Real desktop wallet A connected; the user executed **one** manual `create_space` website write. Its transaction ID is `0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d`, and the frontend displayed a matching FINALIZED readback with ID 3. This is not proof of all other frontend write methods. Details/limitations: [Phase 4D](PHASE_4D_CLOSURE_REPORT.md).

No further transaction is needed for this walkthrough. Historical source below is retained unchanged as archival documentation.

---

## Historical Phase 3 walkthrough

# Review ContextPass without claiming live success

Start with `npm ci && npm run dev`. The overview states **Awaiting Onchain Verification**. The scope example is an illustration, not a classification result. No fabricated green finalized badge, transaction or committee vote is displayed.

1. Read the mechanism: one trusted issuer; the original scope must cover every target requirement; each Validator independently reruns the canonical prompt.
2. Open Spaces. Inspect a supplied Stable Studionet contract address and positive space ID. Read the immutable requirement, issuer and owner. No wallet is needed to read.
3. Open Credentials. Inspect an original root by ID. Its holder, original scope, issuer and revoked flag remain distinct from any admission. Wallet connect/chain status is explicit. Creation/issuance/revoke forms are wired, but writes are locked.
4. Open My admissions. Read a space/holder decision and current active membership, or prepare a one-shot application. NOT_ELIGIBLE is distinct from failed transport or unresolved consensus. Protected note UI never supplies eligibility as authority. Read public paged history.
5. Refresh transaction verification only for a saved real ID after a future authorized signing stage. The current build has no such record. Cached state cannot confirm finality on reload.

Offline automated walkthrough in tests/journey.test.ts simulates issuer → original root → React space → security space → scripted approval/denial → note → root revoke → two rejected posts → preserved public history. It tests integration wiring, not real model reasoning, majority votes or chain execution.

A real demonstration requires future T01–T10 signed evidence. Show both root revocation and current membership=false; capture a rejected protected post and unchanged history. Do not infer this from a frontend badge. No actions from that future stage were executed here.
