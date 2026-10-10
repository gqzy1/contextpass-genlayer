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

# Patched source provenance — Phase 4B candidate

Repository A: gqzy1/context-bound-attestation-genlayer. Fix branch: phase4b-address-compatibility, based exactly on Phase 2 HEAD daf0bf9a70357fb626b0a8e732826c8db6e0c1fc. Immutable source commit: `7a7078cfb07c1d65faf5db432049a5287ce4f5a6`. [Exact patched source](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/7a7078cfb07c1d65faf5db432049a5287ce4f5a6/contracts/context_bound_attestation.py).

Source: contracts/context_bound_attestation.py. Complete copied path: intelligent-contract/contracts/context_bound_attestation.py. New SHA256: `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`. Copy uses binary shutil.copyfile; A/B bytes match. Git blob: 10edfd3d23672789b4b600360750f5041c040f6d. Only the address normalization boundary was changed; original frozen architecture and prompt are untouched.

Previous Phase 2 source SHA256: 4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec; remains unchanged on original Phase 2 branch and at the old user-reported deployed address. Main is not canonical. This patched candidate is not deployed. GenVM v0.2.16 / original Depends / genlayer-js 1.1.8 unchanged. See evidence/phase4b/source-integrity.json and npm run verify:source.
