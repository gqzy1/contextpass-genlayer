# Current canonical source provenance — Phase 4E

Repository A `gqzy1/context-bound-attestation-genlayer`, canonical branch **main**.
Audited A main HEAD: `c690a2200569977e99e4cde9bfd52bd86aa4a89e`. Audited B main HEAD: `6a6e8d13c6d73e40c6d185b0918a3e11e786cedc`.

- Official source: `contracts/context_bound_attestation.py` in A; [immutable audited source](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/c690a2200569977e99e4cde9bfd52bd86aa4a89e/contracts/context_bound_attestation.py).
- Complete B copy: `intelligent-contract/contracts/context_bound_attestation.py`, **17,514 bytes**, byte-for-byte identical to A.
- SHA256: `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`; Git blob SHA: `10edfd3d23672789b4b600360750f5041c040f6d` for both copies.
- Deployment: Stable Studionet 61999, `0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8`, T01 `0x26282c539033879705d9a8dea18c8676dae46c0cd09df9f91cb20d740f9be994`. Phase 4C recorded deployed-source parity; Phase 4E verifies repository parity afresh.
- Historical source change: Phase 4B address normalization, immutable patch commit `7a7078cfb07c1d65faf5db432049a5287ce4f5a6`; Phase 4C deployment baseline `c7c6e50620602d03ad4e3c116ad1532097feab8a`. These are provenance milestones, not current canonical branch names.
- Phase 4D is already merged: A main merge PR #5; B main merge PR #4. Earlier unmerged/bootstrap statements below are historical only.
- GenVM v0.2.16 / pinned Depends / genlayer-js 1.1.8 unchanged; constructor zero arguments, five writes/six reads.
- The production source's Phase 2 docstring is a frozen historical comment; current deployment status is recorded here. It is deliberately not edited.
- Phase 2 SHA `4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec`, blob `54d4c76cc096108f858bfb8eb43f2f37554b49cc` and deployment `0x97B9003a17A8EDBD1b5E3379AA659753791497d9` are **superseded**, never current frontend targets.

No LICENSE is present in either audited tree. Public source visibility does not supply an explicit reuse license; owner decision pending. No license is selected here.

Phase 4E additionally fetched deployed code via read-only RPC and confirmed byte identity afresh; evidence in A evidence/phase4e/rpc-readonly.json and both repositories source-integrity.json.

---

## Historical / Superseded — retained verbatim

# Canonical source provenance

Source repository: gqzy1/context-bound-attestation-genlayer.
Canonical branch: phase2-independent-consensus.
Exact source HEAD: `daf0bf9a70357fb626b0a8e732826c8db6e0c1fc`.
Source path: contracts/context_bound_attestation.py.
GitHub source blob SHA: `54d4c76cc096108f858bfb8eb43f2f37554b49cc`.
Copied path: intelligent-contract/contracts/context_bound_attestation.py.
SHA256: `4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec`.

Source content was fetched from that exact GitHub HEAD, matched against local bytes using the Git blob hash and SHA256, and copied without text processing or newline conversion. Evidence: evidence/phase3/source-integrity.json; command `npm run verify:source`. Repository A source/branches/PRs are read-only in Phase 3. A's main is a bootstrap and must not be represented as complete production source. PR #1 and #2 are unmerged.

Contract target: GenVM v0.2.16. Depends runner: py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6. Exact constructor: zero arguments. Five writes/six views. No Python source modifications, deployment or transaction.

The nine original Architecture Freeze V1 Markdown files and Phase 0/1/2 reports are included unchanged. Frontend/service/test implementation is original work for this authorized phase, using this project's authoritative contract and pinned generic SDK/tooling. No previous unrelated project code was used.

[Canonical file](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/daf0bf9a70357fb626b0a8e732826c8db6e0c1fc/contracts/context_bound_attestation.py).
