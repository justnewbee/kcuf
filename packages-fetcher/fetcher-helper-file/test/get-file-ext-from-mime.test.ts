import {
  describe,
  test,
  expect
} from 'vitest';

import {
  getFileExtFromMime
} from '../src';

describe('getFileExtFromMime', () => {
  test('maps known MIME types to extensions', () => {
    expect(getFileExtFromMime('image/png')).toBe('png');
    expect(getFileExtFromMime('image/jpeg')).toBe('jpg');
    expect(getFileExtFromMime('image/gif')).toBe('gif');
    expect(getFileExtFromMime('text/plain')).toBe('txt');
    expect(getFileExtFromMime('application/json')).toBe('json');
    expect(getFileExtFromMime('application/pdf')).toBe('pdf');
    expect(getFileExtFromMime('application/msword')).toBe('doc');
    expect(getFileExtFromMime('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe('docx');
    expect(getFileExtFromMime('application/vnd.ms-excel')).toBe('xls');
    expect(getFileExtFromMime('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).toBe('xlsx');
  });
  
  test('returns empty string for unknown MIME', () => {
    expect(getFileExtFromMime('application/octet-stream')).toBe('');
    expect(getFileExtFromMime('image/webp')).toBe('');
    expect(getFileExtFromMime('')).toBe('');
  });
  
  test('is case-sensitive on the input', () => {
    expect(getFileExtFromMime('IMAGE/PNG')).toBe('');
  });
});
