# Patched source provenance — Phase 4B candidate

Repository A: gqzy1/context-bound-attestation-genlayer. Fix branch: phase4b-address-compatibility, based exactly on Phase 2 HEAD daf0bf9a70357fb626b0a8e732826c8db6e0c1fc. Immutable source commit: `7a7078cfb07c1d65faf5db432049a5287ce4f5a6`. [Exact patched source](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/7a7078cfb07c1d65faf5db432049a5287ce4f5a6/contracts/context_bound_attestation.py).

Source: contracts/context_bound_attestation.py. Complete copied path: intelligent-contract/contracts/context_bound_attestation.py. New SHA256: `e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d`. Copy uses binary shutil.copyfile; A/B bytes match. Git blob: 10edfd3d23672789b4b600360750f5041c040f6d. Only the address normalization boundary was changed; original frozen architecture and prompt are untouched.

Previous Phase 2 source SHA256: 4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec; remains unchanged on original Phase 2 branch and at the old user-reported deployed address. Main is not canonical. This patched candidate is not deployed. GenVM v0.2.16 / original Depends / genlayer-js 1.1.8 unchanged. See evidence/phase4b/source-integrity.json and npm run verify:source.
