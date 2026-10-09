# Review ContextPass without claiming live success

Start with `npm ci && npm run dev`. The overview states **Awaiting Onchain Verification**. The scope example is an illustration, not a classification result. No fabricated green finalized badge, transaction or committee vote is displayed.

1. Read the mechanism: one trusted issuer; the original scope must cover every target requirement; each Validator independently reruns the canonical prompt.
2. Open Spaces. Inspect a supplied Stable Studionet contract address and positive space ID. Read the immutable requirement, issuer and owner. No wallet is needed to read.
3. Open Credentials. Inspect an original root by ID. Its holder, original scope, issuer and revoked flag remain distinct from any admission. Wallet connect/chain status is explicit. Creation/issuance/revoke forms are wired, but writes are locked.
4. Open My admissions. Read a space/holder decision and current active membership, or prepare a one-shot application. NOT_ELIGIBLE is distinct from failed transport or unresolved consensus. Protected note UI never supplies eligibility as authority. Read public paged history.
5. Refresh transaction verification only for a saved real ID after a future authorized signing stage. The current build has no such record. Cached state cannot confirm finality on reload.

Offline automated walkthrough in tests/journey.test.ts simulates issuer → original root → React space → security space → scripted approval/denial → note → root revoke → two rejected posts → preserved public history. It tests integration wiring, not real model reasoning, majority votes or chain execution.

A real demonstration requires future T01–T10 signed evidence. Show both root revocation and current membership=false; capture a rejected protected post and unchanged history. Do not infer this from a frontend badge. No actions from that future stage were executed here.
