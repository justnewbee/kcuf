/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import blobToFile from '../src/helper/blob-to-file';

describe('blobToFile', () => {
  test('produces a File with the requested name and inherited type', () => {
    const blob = new Blob(['hello'], {
      type: 'text/plain'
    });
    const before = Date.now();
    const file = blobToFile(blob, 'greeting.txt');
    
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('greeting.txt');
    expect(file.type).toBe('text/plain');
    expect(file.size).toBe(blob.size);
    expect(file.lastModified).toBeGreaterThanOrEqual(before);
    expect(file.lastModified).toBeLessThanOrEqual(Date.now());
  });
  
  test('appends an extension when missing and the mime is known', () => {
    const blob = new Blob(['x'], {
      type: 'image/png'
    });
    
    expect(blobToFile(blob, 'photo').name).toBe('photo.png');
  });
  
  test('keeps the supplied name when it already has an extension', () => {
    const blob = new Blob(['x'], {
      type: 'image/png'
    });
    
    expect(blobToFile(blob, 'photo.bin').name).toBe('photo.bin');
  });
  
  test('uses the default filename when none provided', () => {
    const blob = new Blob(['x'], {
      type: 'image/png'
    });
    
    expect(blobToFile(blob).name).toBe('blob-to-file.png');
  });
});
