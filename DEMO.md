# ContextPass — Live Demo Guide

**Live application:** https://gqzy1.github.io/contextpass-genlayer/  
**Network:** GenLayer Stable Studionet · Chain ID `61999`  
**Deployed contract:** [View in GenLayer Explorer](https://explorer-studio.genlayer.com/address/0xDe9abfBe2E4A61d23e27b552e241f5Bb1d1821b8)  
**Project source:** [ContextPass](https://github.com/gqzy1/contextpass-genlayer) · **Contract source:** [Context-Bound Attestation](https://github.com/gqzy1/context-bound-attestation-genlayer)

ContextPass demonstrates **non-transitive, context-bound community admission**: a credential for one scope does not automatically authorize participation in an unrelated space. A space fixes its entry requirement and trusted original issuer. The GenLayer contract checks the original credential, then independent Leader/Validator semantic evaluations decide whether its scope covers that requirement. Admission does not create a transferable credential; revoking the original root disables derived posting rights while preserving public history.

## Five-minute read-only walkthrough

The entire walkthrough below works without a connected wallet and does **not** create any transactions.

1. **Overview — inspect verified onchain state.** Open the [live application](https://gqzy1.github.io/contextpass-genlayer/) and select **Refresh verified example · read only**. This retrieves real finalized-state data from the pinned Stable Studionet deployment. The illustration at the top of the page is labeled as an example, not a live model decision.
2. **Spaces — compare different requirements.** Open **Spaces**, enter ID **1** and select **Read space**: the title is *React Components* and the requirement is “Contribute React UI components to this room.” Repeat with ID **2**: *Security Audit* requires “Perform security audits of production authentication systems.” Each space fixes its trusted issuer and its entry requirement.
3. **Credentials — inspect the original scope.** Open **Credentials** and read **Root Attestation ID 1**. The original scope says “Can develop and maintain React UI components.” The root is now **revoked**. It is an issuer's assertion, not an independently verified real-world qualification.
4. **My admissions — compare historical decisions with current rights.** In **My admissions**, use holder `0x5EDb6E65aaEA10A7B3CC34e8d5724e41D1f6da84`. Read Space ID **1** to see historical **ELIGIBLE**, and Space ID **2** to see historical **NOT_ELIGIBLE**. **Current active membership is false in both spaces.** Historical ELIGIBLE must not be treated as permission to post after root revocation.
5. **Public notes — confirm retained history.** Read public notes for Space ID **1** to find “Hello from an approved member.” Space ID **2** has no notes in the verified example. The old note remains readable after revocation.

These are recorded examples: onchain state is public and may evolve. The [October 10 verified-state readback](evidence/phase4e/sdk-current-readback.json) recorded 3 spaces, 1 original attestation, 2 decisions and 1 note; those are snapshot counts, not promised lifetime totals.

## Independently verify the consensus and permission boundary

| Scenario | Onchain record | What it proves |
| --- | --- | --- |
| Positive admission | [T04 — Space 1](https://explorer-studio.genlayer.com/tx/0xd977e00d326e41b972c1560f3912b0c7f4cc1e8766544a0c7052956243bc0e50) | A successful `ELIGIBLE` admission for the scoped React requirement |
| Negative admission | [T07 — Space 2](https://explorer-studio.genlayer.com/tx/0xbd5200b6dfbca29c91bd4c4f0d473b4447af4042e35b7db5423766a6ced838c6) | `NOT_ELIGIBLE` after one Leader rotation; check the consensus panel |
| Revocation | [T09 — Root 1](https://explorer-studio.genlayer.com/tx/0xcf88f40a1beab8a8c979b7c0f3442e0ba484ac79bda78da8668c4d214669f2d6) | Original issuer revokes the root credential |
| Protected-post rejection | [T08](https://explorer-studio.genlayer.com/tx/0x42765027562169a896139dc2d676a4c0140179bdbd610c8d873e09ce6557a2dc) and [T10](https://explorer-studio.genlayer.com/tx/0x9b3365e65452c635a0663218edec0913dddf59f777b1be9209b03763959da01b) | Expected `ACTIVE_MEMBER_ONLY` business Rollbacks, **not successful posts** |
| Real frontend transaction | [create_space — Space 3](https://explorer-studio.genlayer.com/tx/0x85c5037d3ac249faca70336a6760d4538dc26407181bf71d79da091e6457d02d) | Manually wallet-signed website write: FINALIZED / SUCCESS / Return ID 3 |

The [complete T01–T10 index](https://github.com/gqzy1/context-bound-attestation-genlayer/blob/main/ONCHAIN_EVIDENCE_INDEX.md), [frontend receipt summary](evidence/phase4e/frontend-tx-summary.json) and [current-state readback](evidence/phase4e/sdk-current-readback.json) provide additional reproducible evidence.

## Optional: explore write flows

The published interface provides Space creation, original credential issuance/revocation, one-time admission and protected-note posting. Connecting a compatible injected wallet is optional for reads. **Any write requires an explicit connected-wallet review and signature on Chain ID 61999**; the application does not automatically transact. Only the verified canonical contract is a permitted write target. For a no-cost review, use the read-only walkthrough rather than creating new records.

The production website's `create_space` flow was exercised once with a real wallet, resulting in Space **#3**. The other four website write methods were not individually signed in production-browser QA; their onchain behavior has separate Studio evidence. Wallet rejection, account/chain switching, reload recovery and mobile signing were not comprehensively live-tested. This guide makes no claim that those cases passed.

## Implementation and verification

- **App and tests:** [README](README.md), [testing instructions](TESTING.md)
- **Embedded complete contract source:** [intelligent-contract/contracts/context_bound_attestation.py](intelligent-contract/contracts/context_bound_attestation.py)
- **Canonical source / onchain provenance:** [SOURCE_PROVENANCE](SOURCE_PROVENANCE.md), [deployment manifest](DEPLOYMENT_MANIFEST_STUDIONET.md)
- **Audit trail and known limitations:** [Phase 4E audit](PHASE_4E_SUBMISSION_AUDIT.md), [submitting and verification notes](SUBMISSION_PROJECTS.md)

Public notes and credentials are not private; an issuer-issued attestation is not an identity check or independent proof of skill.
