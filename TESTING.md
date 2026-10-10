# Phase 4B verification

Address suite: 77/77 PASS. A total: 240/240 PASS (163 existing + 77 new). B frontend: 124/124 PASS (116 existing + 8 new). All offline; scripted semantic outcomes are not real model/validator results. See Phase 4B report and evidence/phase4b for actual commands and the intentional pre-fix INVALID_ADDRESS failure. Python Strict retains upstream diagnostics; final status is recorded in the report. No suppression or SDK patch.

# Phase 3 offline testing

Final result: **116/116 PASS**, 0 failures/pending, 5 test files.

Run `npm ci`, `npm test`, `npm run typecheck`, `npm run verify:source`, `npm run build`. To save actual logs and UTC/exits, run `python scripts/verify-phase3.py` (standard library only). See evidence/phase3/.

All requests in tests are blocked by default. Named SDK HTTP tests explicitly replace fetch with scripted local Responses. Test wallets are EIP-1193 request mocks with no signer/key and no blockchain connection. Tests use actual genlayer-js 1.1.8 serialization/decoder and method calls, plus a scripted Mock Transport; none establishes real consensus or deployed finality.

## Requirement mapping

| Requirement | Offline evidence | Live boundary |
|---|---|---|
| F01 | Visitor overview, no fabricated proof; wallet-free reads; real SDK gen_call against Mock HTTP | Real verified deployment/example absent |
| F02 | Wrong chain UI, live chain/account recheck, last-moment provider guard | Real wallet browser compatibility unrun |
| F03 | Connect/disconnect/events/refusal/stale connect; signing refusal clears pending | Actual signature unrun |
| F04 | Natural-language authorization errors, self-issue/input/address validation, unknown objects | Actual onchain rejection unrun |
| F05 | Single click/rerender, saved ID/reload, unknown submission recovery, storage failure, provider one-send gate | Live submission/recovery unrun |
| F06 | Read coalescing, 350 ms queue, bounded 429 retries, seconds/date Retry-After and actual SDK wrapped cause | Live RPC limits unmeasured |
| F07 | Pending/ACCEPTED/undetermined/canceled/failure/denial; receipt bindings and all method-specific readbacks; cached confirmation downgraded | Actual FINALIZED evidence absent |
| F08 | Scripted revoke/post gate integration and rejected receipt; byte-identical A source inherits Phase 2 D15/D16 contract enforcement evidence | Real gate attempt T08/T10 unrun |
| F09 | Component route/render checks, escaped notes, responsive media/focus CSS, strict types and production build | Real desktop/mobile browser visual and console QA NOT RUN: local build URL blocked by browser policy |
| F10 | Four hash routes/fallback and production project base; no backend | Published Pages hosting unverified |

The full product journey script supplies expected ELIGIBLE/NOT_ELIGIBLE labels. These are not real model tests. Phase 2's D/N/S 163 tests are inherited authoritative evidence, not included in this frontend total and not described as a newly executed network suite.

TypeScript uses strict=true, skipLibCheck=false, unused checks and no diagnostic suppression. SDK 1.1.8 references an unavailable exported private viem authorization path and an undeclared EthereumProvider. src/sdk-compat.d.ts provides two precise public-type aliases (viem.AuthorizationRequest / viem.EIP1193Provider); it neither changes runtime nor disables checking.

Copied Python contract lint/schema passes (five writes/six views/zero constructor args); default typecheck passes. Raw Python Strict **FAIL**, seven reportUnknownMemberType: six existing view decorators plus run_nondet_unsafe unparameterized Result. No SDK/contract patch, global suppression or filtered output. JSON summary.errors is inconsistent; exit=1 / ok=false / actual diagnostics govern the result.

Resolved development failures included test-case title BigInt serialization, expected bigint decoder values, form accessible labels, test typing/fixture syntax, and the actual SDK's wrapped 429 cause. Final saved logs describe the final suite; failed intermediate runs were not counted as pass.

Build retains a large SDK-bundle warning (~776 kB minified / ~190 kB gzip). It is a performance concern, not a hidden build failure. npm's deprecated transitive eslint/proxy-config warning was observed during cached installation; no automatic version upgrade was made. No GitHub Actions job has run. Extra cash spent/real transactions: zero.
