import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const actual = createHash('sha256').update(readFileSync('intelligent-contract/contracts/context_bound_attestation.py')).digest('hex');
const expected = '4412035632f586b72c376fb42e618f68ff665063cf356dd727849d76dd7f08ec';
console.log(JSON.stringify({ expected, actual, pass: actual === expected }));
if (actual !== expected) process.exit(1);
