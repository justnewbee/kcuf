import {
  describe,
  expect,
  test
} from 'vitest';

import {
  getFileExtFromFilename
} from '../src';

describe('getFileExtFromFilename', () => {
  test('returns the extension with the leading dot', () => {
    expect(getFileExtFromFilename('photo.png')).toBe('png');
    expect(getFileExtFromFilename('report.pdf')).toBe('pdf');
    expect(getFileExtFromFilename('archive.zip')).toBe('zip');
  });

  test('lowercases the extension', () => {
    expect(getFileExtFromFilename('PHOTO.PNG')).toBe('png');
    expect(getFileExtFromFilename('Report.PDF')).toBe('pdf');
    expect(getFileExtFromFilename('Mixed.JpG')).toBe('jpg');
  });

  test('uses only the segment after the last dot', () => {
    expect(getFileExtFromFilename('archive.tar.gz')).toBe('gz');
    expect(getFileExtFromFilename('weird.name.with.many.dots.pdf')).toBe('pdf');
  });

  test('returns empty string when there is no dot', () => {
    expect(getFileExtFromFilename('no-extension')).toBe('');
    expect(getFileExtFromFilename('')).toBe('');
  });

  test('returns just "." for a trailing dot', () => {
    expect(getFileExtFromFilename('trailing-dot.')).toBe('');
  });

  test('treats a leading-dot filename as one big extension', () => {
    // lastIndexOf('.') === 0, so the whole string (lowercased) is returned
    expect(getFileExtFromFilename('.bashrc')).toBe('bashrc');
    expect(getFileExtFromFilename('.ENV')).toBe('env');
  });

  test('preserves unknown extensions verbatim (lowercased)', () => {
    expect(getFileExtFromFilename('mystery.xyz')).toBe('xyz');
    expect(getFileExtFromFilename('archive.BIN')).toBe('bin');
  });
});
