import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const actual = createHash('sha256').update(readFileSync('intelligent-contract/contracts/context_bound_attestation.py')).digest('hex');
const expected = 'e50cb6703ba63da5095dafc5d9867246888c5151d0773489aed3166033484b3d';
console.log(JSON.stringify({ expected, actual, pass: actual === expected }));
if (actual !== expected) process.exit(1);
