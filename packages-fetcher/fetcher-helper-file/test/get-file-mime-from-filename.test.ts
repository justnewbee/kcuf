import {
  describe,
  test,
  expect
} from 'vitest';

import {
  getFileMimeFromFilename
} from '../src';

describe('mimeFromFilename', () => {
  test('returns the MIME type for known extensions', () => {
    expect(getFileMimeFromFilename('photo.png')).toBe('image/png');
    expect(getFileMimeFromFilename('photo.jpg')).toBe('image/jpeg');
    expect(getFileMimeFromFilename('animation.gif')).toBe('image/gif');
    expect(getFileMimeFromFilename('readme.txt')).toBe('text/plain');
    expect(getFileMimeFromFilename('config.json')).toBe('application/json');
    expect(getFileMimeFromFilename('report.pdf')).toBe('application/pdf');
    expect(getFileMimeFromFilename('letter.doc')).toBe('application/msword');
    expect(getFileMimeFromFilename('letter.docx')).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    expect(getFileMimeFromFilename('budget.xls')).toBe('application/vnd.ms-excel');
    expect(getFileMimeFromFilename('budget.xlsx')).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
  
  test('uses only the segment after the last dot', () => {
    expect(getFileMimeFromFilename('archive.tar.gz.png')).toBe('image/png');
    expect(getFileMimeFromFilename('weird.name.with.many.dots.pdf')).toBe('application/pdf');
  });
  
  test('is case-insensitive on the extension', () => {
    expect(getFileMimeFromFilename('PHOTO.PNG')).toBe('image/png');
    expect(getFileMimeFromFilename('Report.PDF')).toBe('application/pdf');
  });
  
  test('returns empty string for unknown or missing extensions', () => {
    expect(getFileMimeFromFilename('photo.webp')).toBe('');
    expect(getFileMimeFromFilename('no-extension')).toBe('');
    expect(getFileMimeFromFilename('')).toBe('');
    expect(getFileMimeFromFilename('trailing-dot.')).toBe('');
  });
});
