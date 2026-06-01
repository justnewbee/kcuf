import {
  describe,
  expect,
  test
} from 'vitest';

import {
  getExtFromMime
} from '../src';

describe('getExtFromMime', () => {
  test('maps known MIME types to extensions', () => {
    expect(getExtFromMime('image/png')).toBe('png');
    expect(getExtFromMime('image/jpeg')).toBe('jpg');
    expect(getExtFromMime('image/gif')).toBe('gif');
    expect(getExtFromMime('text/plain')).toBe('txt');
    expect(getExtFromMime('application/json')).toBe('json');
    expect(getExtFromMime('application/pdf')).toBe('pdf');
    expect(getExtFromMime('application/msword')).toBe('doc');
    expect(getExtFromMime('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe('docx');
    expect(getExtFromMime('application/vnd.ms-excel')).toBe('xls');
    expect(getExtFromMime('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).toBe('xlsx');
  });
  
  test('returns empty string for unknown MIME', () => {
    expect(getExtFromMime('application/octet-stream')).toBe('');
    expect(getExtFromMime('image/webp')).toBe('');
    expect(getExtFromMime('')).toBe('');
  });
  
  test('is case-sensitive on the input', () => {
    expect(getExtFromMime('IMAGE/PNG')).toBe('');
  });
});
