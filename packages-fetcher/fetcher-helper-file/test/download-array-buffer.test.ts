/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
  vi,
  type MockInstance
} from 'vitest';

import downloadArrayBuffer from '../src/helper/download-array-buffer';

const FAKE_URL = 'blob:fake-url';

async function blobToString(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  
  return Array.from(bytes).map(v => String.fromCharCode(v)).join('');
}

describe('downloadArrayBuffer', () => {
  let createUrl: ReturnType<typeof vi.fn>;
  let revokeUrl: ReturnType<typeof vi.fn>;
  let clickSpy: MockInstance<() => void>;
  let blobs: Blob[];
  
  beforeEach(() => {
    blobs = [];
    createUrl = vi.fn((b: Blob) => {
      blobs.push(b);
      
      return FAKE_URL;
    });
    revokeUrl = vi.fn();
    URL.createObjectURL = createUrl as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeUrl as unknown as typeof URL.revokeObjectURL;
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
  });
  
  afterEach(() => {
    clickSpy.mockRestore();
  });
  
  test('builds a blob from the buffer with mime inferred from the filename', async () => {
    const buffer = new TextEncoder().encode('hello').buffer;
    
    downloadArrayBuffer(buffer, 'note.txt');
    
    expect(blobs).toHaveLength(1);
    expect(blobs[0]?.type).toBe('text/plain');
    expect(blobs[0] ? await blobToString(blobs[0]) : '').toBe('hello');
    
    const anchor = clickSpy.mock.contexts[0] as HTMLAnchorElement;
    
    expect(anchor.download).toBe('note.txt');
    expect(revokeUrl).toHaveBeenCalledWith(FAKE_URL);
  });
  
  test('omits blob type when filename has no recognised extension', () => {
    const buffer = new Uint8Array([1, 2, 3]).buffer;
    
    downloadArrayBuffer(buffer, 'mystery.bin');
    
    expect(blobs).toHaveLength(1);
    expect(blobs[0]?.type).toBe('');
  });
  
  test('uses the default filename when none provided', () => {
    downloadArrayBuffer(new Uint8Array([0]).buffer);
    
    const anchor = clickSpy.mock.contexts[0] as HTMLAnchorElement;
    
    expect(anchor.download).toBe('download');
    expect(blobs[0]?.type).toBe('');
  });
});
