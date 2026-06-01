import {
  describe,
  expect,
  test
} from 'vitest';

import mimeFromFilename from '../src/helper/mime-from-filename';

describe('mimeFromFilename', () => {
  test('returns the MIME type for known extensions', () => {
    expect(mimeFromFilename('photo.png')).toBe('image/png');
    expect(mimeFromFilename('photo.jpg')).toBe('image/jpeg');
    expect(mimeFromFilename('animation.gif')).toBe('image/gif');
    expect(mimeFromFilename('readme.txt')).toBe('text/plain');
    expect(mimeFromFilename('config.json')).toBe('application/json');
    expect(mimeFromFilename('report.pdf')).toBe('application/pdf');
    expect(mimeFromFilename('letter.doc')).toBe('application/msword');
    expect(mimeFromFilename('letter.docx')).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    expect(mimeFromFilename('budget.xls')).toBe('application/vnd.ms-excel');
    expect(mimeFromFilename('budget.xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
  
  test('uses only the segment after the last dot', () => {
    expect(mimeFromFilename('archive.tar.gz.png')).toBe('image/png');
    expect(mimeFromFilename('weird.name.with.many.dots.pdf')).toBe('application/pdf');
  });
  
  test('is case-insensitive on the extension', () => {
    expect(mimeFromFilename('PHOTO.PNG')).toBe('image/png');
    expect(mimeFromFilename('Report.PDF')).toBe('application/pdf');
  });
  
  test('returns empty string for unknown or missing extensions', () => {
    expect(mimeFromFilename('photo.webp')).toBe('');
    expect(mimeFromFilename('no-extension')).toBe('');
    expect(mimeFromFilename('')).toBe('');
    expect(mimeFromFilename('trailing-dot.')).toBe('');
  });
});
