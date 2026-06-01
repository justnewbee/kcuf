import {
  describe,
  expect,
  test
} from 'vitest';

import mimeToExt from '../src/helper/mime-to-ext';

describe('mimeToExt', () => {
  test('maps known MIME types to extensions', () => {
    expect(mimeToExt('image/png')).toBe('png');
    expect(mimeToExt('image/jpeg')).toBe('jpg');
    expect(mimeToExt('image/gif')).toBe('gif');
    expect(mimeToExt('text/plain')).toBe('txt');
    expect(mimeToExt('application/json')).toBe('json');
    expect(mimeToExt('application/pdf')).toBe('pdf');
    expect(mimeToExt('application/msword')).toBe('doc');
    expect(mimeToExt('application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBe('docx');
    expect(mimeToExt('application/vnd.ms-excel')).toBe('xls');
    expect(mimeToExt('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')).toBe('xlsx');
  });
  
  test('returns empty string for unknown MIME', () => {
    expect(mimeToExt('application/octet-stream')).toBe('');
    expect(mimeToExt('image/webp')).toBe('');
    expect(mimeToExt('')).toBe('');
  });
  
  test('is case-sensitive on the input', () => {
    expect(mimeToExt('IMAGE/PNG')).toBe('');
  });
});
