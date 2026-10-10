# Stable Studionet manifest — patched candidate NOT DEPLOYED

| Field | Value |
|---|---|
| Network / Chain / RPC | Stable Studionet / 61999 / https://studio.genlayer.com/api |
| Exact source commit | 7a7078cfb07c1d65faf5db432049a5287ce4f5a6 |
| Candidate branch | phase4b-address-compatibility |
| Candidate source SHA256 | e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d |
| Candidate contract address / deployment tx | null / null; NOT DEPLOYED |
| Candidate source | intelligent-contract/contracts/context_bound_attestation.py |
| GenVM / JS SDK | v0.2.16 / genlayer-js 1.1.8, unchanged Depends |
| Constructor / ABI | no arguments / unchanged 5 writes + 6 reads |
| Frontend real writes | BOTH LOCKS RETAINED |
| Pages / Portal | no publication or submission |

User reports old source deployment at 0x97B9003a17A8EDBD1b5E3379AA659753791497d9 as FINALIZED / Accepted / SUCCESS, and two issuance rollbacks INVALID_ADDRESS. Those reports were not independently fetched in this fix phase; failing transaction IDs/raw calldata were not supplied. The generic get_decision read error remains unproven. get_counts zero is user-supplied evidence. Old source hash: 4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec. Do not bind this address to the patched source hash. T02–T10 remain paused.

Prefer a separately approved, manually signed new deployment of the exact reviewed patch on Stable Studionet, with source/hash/receipt verification before tests resume. The contract has no application upgrade or migration entry; platform upgrade support was not verified. Never claim a PR changes existing onchain code. All new IDs must be read from actual receipts. No live AI outcome or validator agreement is established by offline tests.
