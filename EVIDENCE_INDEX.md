# Evidence index — offline and undeployed

| Claim | Evidence | What it proves |
|---|---|---|
| Actual frontend checks | evidence/phase3/command-results.json + individual logs | Executed commands, UTC, exits |
| Offline frontend suite | evidence/phase3/frontend-results.json | Mock Transport/test wallet/component/SDK script checks; no live transactions |
| Byte-identical canonical source | evidence/phase3/source-integrity.json; source-integrity.log | SHA256 and Git blob match exact Phase 2 source |
| Python copied source lint/default/Strict | evidence/phase3/contract-command-results.json + logs | Schema/default pass; raw Strict fails with seven retained upstream diagnostics |
| Clean cached dependencies | evidence/phase3/clean-install.json | Actual npm ci --offline --ignore-scripts succeeded, 316 packages; final checks used that install |
| Prior A acceptance | PHASE_2_IMPLEMENTATION_REPORT.md and Repository A PR #2 | Inherited 163/163 offline result; not rerun as a network test |
| GitHub delivery | PHASE_3_IMPLEMENTATION_REPORT.md; PROJECT_CHECKPOINT.md | Independent B branch and Draft PR, no merge |
| Real deployed source/finality/committee votes | NOT AVAILABLE | T01–T10 NOT RUN |
| Real desktop/mobile browser screenshots | NOT AVAILABLE | Local URL was policy-blocked; no browser/mobile claim |
| GitHub Pages hosted URL / Portal submission | NOT AVAILABLE | Not published / not submitted |

Synthetic test hashes and addresses are not public proof URLs. Do not copy them into production evidence. No successful mocked transaction establishes real network success.
