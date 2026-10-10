"""Record actual offline Phase 3 commands; never contacts GenLayer or signs."""
from pathlib import Path
import datetime
import hashlib
import json
import os
import subprocess

root = Path(__file__).resolve().parents[1]
evidence = root / 'evidence/phase3'
evidence.mkdir(parents=True, exist_ok=True)
commands = [
    ('node-version', ['node', '--version']),
    ('npm-version', ['npm', '--version']),
    ('frontend-tests', ['npm', 'test', '--', '--reporter=default', '--reporter=json', '--outputFile=evidence/phase3/frontend-results.json']),
    ('typescript-strict', ['npm', 'run', 'typecheck']),
    ('production-build', ['npm', 'run', 'build']),
    ('source-integrity', ['npm', 'run', 'verify:source']),
]
results = []
for name, argv in commands:
    start = datetime.datetime.now(datetime.timezone.utc).isoformat()
    result = subprocess.run(argv, cwd=root, text=True, capture_output=True)
    (evidence / f'{name}.log').write_text(result.stdout + result.stderr)
    results.append(dict(name=name, command=argv, cwd=str(root), started_utc=start, exit_code=result.returncode))
    print(name, 'PASS' if result.returncode == 0 else 'FAIL')
(evidence / 'command-results.json').write_text(json.dumps(results, indent=2)+'\n')
source = (root / 'intelligent-contract/contracts/context_bound_attestation.py').read_bytes()
frozen = {p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((root/'architecture-freeze-v1').glob('*.md'))}
integrity = dict(repository_a='gqzy1/context-bound-attestation-genlayer', ref='daf0bf9a70357fb626b0a8e732826c8db6e0c1fc', source_path='contracts/context_bound_attestation.py', copied_path='intelligent-contract/contracts/context_bound_attestation.py', sha256=hashlib.sha256(source).hexdigest(), git_blob_sha=hashlib.sha1(b'blob '+str(len(source)).encode()+b'\0'+source).hexdigest(), bytes=len(source), frozen=frozen)
(evidence/'source-integrity.json').write_text(json.dumps(integrity,indent=2)+'\n')
raise SystemExit(any(r['exit_code'] for r in results))
