/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import base64ToFile from '../src/helper/base64-to-file';

const HELLO_BASE64 = 'SGVsbG8sIFdvcmxkIQ==';
const PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

async function fileToString(file: File): Promise<string> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  
  return Array.from(bytes).map(v => String.fromCharCode(v)).join('');
}

describe('base64ToFile', () => {
  test('returns a File with mime from the data url', async () => {
    const file = base64ToFile(`data:text/plain;base64,${HELLO_BASE64}`, 'greeting.txt');
    
    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe('greeting.txt');
    expect(file.type).toBe('text/plain');
    expect(await fileToString(file)).toBe('Hello, World!');
  });
  
  test('appends extension when filename has none and mime is known', () => {
    const file = base64ToFile(`data:image/png;base64,${PNG_BASE64}`, 'photo');
    
    expect(file.name).toBe('photo.png');
    expect(file.type).toBe('image/png');
  });
  
  test('uses the default filename when none provided', () => {
    const file = base64ToFile(`data:image/png;base64,${PNG_BASE64}`);
    
    expect(file.name).toBe('base64-to-file.png');
  });
});
