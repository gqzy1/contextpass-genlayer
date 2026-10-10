import { it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { SOURCE_SHA,WRITES_LOCKED } from '../src/protocol';
it('canonical contract bytes match the exact reviewed candidate SHA256',()=>{expect(createHash('sha256').update(readFileSync('intelligent-contract/contracts/context_bound_attestation.py')).digest('hex')).toBe(SOURCE_SHA);});
it('F10 Vite GitHub Pages base is the Repository B project path',()=>{expect(readFileSync('vite.config.ts','utf8')).toContain("base: '/contextpass-genlayer/'");});
it('F09 CSS provides desktop/mobile layouts and visible keyboard focus',()=>{const css=readFileSync('src/styles.css','utf8');expect(css).toContain('@media(max-width:680px)');expect(css).toContain('grid-template-columns:1fr');expect(css).toContain(':focus-visible');});
it('exact dependency lock pins genlayer-js and Phase 0 frontend versions',()=>{const pkg=JSON.parse(readFileSync('package.json','utf8'));const lock=JSON.parse(readFileSync('package-lock.json','utf8'));for(const [name,version] of Object.entries(pkg.dependencies))expect(lock.packages[`node_modules/${name}`].version).toBe(version);expect(pkg.dependencies['genlayer-js']).toBe('1.1.8');});
it('Phase 3 production contains no runtime write-unlock environment option',()=>{expect(WRITES_LOCKED).toBe(true);expect(readFileSync('src/main.tsx','utf8')).not.toContain('import.meta.env');expect(readFileSync('src/App.tsx','utf8')).not.toContain('MockTransport');});
