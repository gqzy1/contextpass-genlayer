import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'node:util';
Object.assign(globalThis,{TextEncoder,TextDecoder});
beforeEach(()=>{localStorage.clear();location.hash='';vi.stubGlobal('fetch',vi.fn(()=>Promise.reject(new Error('OFFLINE_TEST_NETWORK_BLOCKED'))));});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
