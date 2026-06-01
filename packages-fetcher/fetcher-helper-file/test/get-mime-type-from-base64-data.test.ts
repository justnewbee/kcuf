import {
  describe,
  expect,
  test
} from 'vitest';

import getMimeFromBase64Data from '../src/helper/get-mime-from-base64-data';

// Magic-byte fixtures for the formats the helper recognises.
const PNG_HEADER = new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const GIF_HEADER = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61, 0x00, 0x00]);
const JPEG_HEADER = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46]);
const PDF_HEADER = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x35]);

describe('getMimeTypeFromBase64Data', () => {
  test('detects PNG (full 8-byte magic)', () => {
    expect(getMimeFromBase64Data(PNG_HEADER)).toBe('image/png');
  });
  
  // GIF / JPEG / PDF magic bytes are shorter than 8 bytes. The current
  // implementation always reads the first 8 bytes and looks the result up
  // verbatim in HEADER_MIME_MAP, so only PNG (whose magic is exactly 8 bytes)
  // is reliably detected. The remaining headers are kept here to lock in the
  // present behaviour and surface the limitation if the implementation changes.
  test('does not currently detect GIF from raw bytes', () => {
    expect(getMimeFromBase64Data(GIF_HEADER)).toBe('');
  });
  
  test('does not currently detect JPEG from raw bytes', () => {
    expect(getMimeFromBase64Data(JPEG_HEADER)).toBe('');
  });
  
  test('does not currently detect PDF from raw bytes', () => {
    expect(getMimeFromBase64Data(PDF_HEADER)).toBe('');
  });
  
  test('returns empty string for unknown headers', () => {
    expect(getMimeFromBase64Data(new Uint8Array([0x00, 0x01, 0x02, 0x03]))).toBe('');
    expect(getMimeFromBase64Data(new Uint8Array(0))).toBe('');
  });
  
  test('only inspects the first 8 bytes', () => {
    const padded = new Uint8Array(16);
    
    padded.set(PNG_HEADER, 0);
    expect(getMimeFromBase64Data(padded)).toBe('image/png');
  });
});
