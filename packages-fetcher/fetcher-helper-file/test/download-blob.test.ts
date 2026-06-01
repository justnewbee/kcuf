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

import {
  downloadBlob
} from '../src';

const FAKE_URL = 'blob:fake-url';

describe('downloadBlob', () => {
  let createUrl: ReturnType<typeof vi.fn>;
  let revokeUrl: ReturnType<typeof vi.fn>;
  let clickSpy: MockInstance<() => void>;
  
  beforeEach(() => {
    createUrl = vi.fn(() => FAKE_URL);
    revokeUrl = vi.fn();
    URL.createObjectURL = createUrl as unknown as typeof URL.createObjectURL;
    URL.revokeObjectURL = revokeUrl as unknown as typeof URL.revokeObjectURL;
    // Stub click so jsdom doesn't try to navigate.
    clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
  });
  
  afterEach(() => {
    clickSpy.mockRestore();
  });
  
  test('creates an anchor, triggers a click, and cleans up', () => {
    const blob = new Blob(['hi'], {
      type: 'text/plain'
    });
    
    downloadBlob(blob, 'note.txt');
    
    expect(createUrl).toHaveBeenCalledWith(blob);
    expect(clickSpy).toHaveBeenCalledOnce();
    
    const anchor = clickSpy.mock.contexts[0] as HTMLAnchorElement;
    
    expect(anchor.tagName).toBe('A');
    expect(anchor.download).toBe('note.txt');
    expect(anchor.getAttribute('href')).toBe(FAKE_URL);
    
    // Anchor is removed from the DOM and the object URL is revoked.
    expect(document.body.contains(anchor)).toBe(false);
    expect(revokeUrl).toHaveBeenCalledWith(FAKE_URL);
  });
  
  test('defaults the filename to "download"', () => {
    downloadBlob(new Blob(['x']));
    
    const anchor = clickSpy.mock.contexts[0] as HTMLAnchorElement;
    
    expect(anchor.download).toBe('download');
  });
});
