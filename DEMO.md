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
