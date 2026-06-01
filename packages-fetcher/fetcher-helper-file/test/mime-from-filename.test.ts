import {
  describe,
  expect,
  test
} from 'vitest';

import getMimeFromFilename from '../src/helper/get-mime-from-filename';

describe('mimeFromFilename', () => {
  test('returns the MIME type for known extensions', () => {
    expect(getMimeFromFilename('photo.png')).toBe('image/png');
    expect(getMimeFromFilename('photo.jpg')).toBe('image/jpeg');
    expect(getMimeFromFilename('animation.gif')).toBe('image/gif');
    expect(getMimeFromFilename('readme.txt')).toBe('text/plain');
    expect(getMimeFromFilename('config.json')).toBe('application/json');
    expect(getMimeFromFilename('report.pdf')).toBe('application/pdf');
    expect(getMimeFromFilename('letter.doc')).toBe('application/msword');
    expect(getMimeFromFilename('letter.docx')).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    expect(getMimeFromFilename('budget.xls')).toBe('application/vnd.ms-excel');
    expect(getMimeFromFilename('budget.xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
  
  test('uses only the segment after the last dot', () => {
    expect(getMimeFromFilename('archive.tar.gz.png')).toBe('image/png');
    expect(getMimeFromFilename('weird.name.with.many.dots.pdf')).toBe('application/pdf');
  });
  
  test('is case-insensitive on the extension', () => {
    expect(getMimeFromFilename('PHOTO.PNG')).toBe('image/png');
    expect(getMimeFromFilename('Report.PDF')).toBe('application/pdf');
  });
  
  test('returns empty string for unknown or missing extensions', () => {
    expect(getMimeFromFilename('photo.webp')).toBe('');
    expect(getMimeFromFilename('no-extension')).toBe('');
    expect(getMimeFromFilename('')).toBe('');
    expect(getMimeFromFilename('trailing-dot.')).toBe('');
  });
});
