/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import {
  checkFileType
} from '../src';

function makeFile(name: string): File {
  return new File([''], name);
}

describe('checkFileType', () => {
  test('returns true when accept is empty / whitespace / *', () => {
    const file = makeFile('photo.png');
    
    expect(checkFileType(file, '')).toBe(true);
    expect(checkFileType(file, '   ')).toBe(true);
    expect(checkFileType(file, ',')).toBe(true);
    expect(checkFileType(file, '*')).toBe(true);
    expect(checkFileType(file, ' image/png , * ')).toBe(true);
  });
  
  test('matches by extension', () => {
    expect(checkFileType(makeFile('photo.png'), '.png')).toBe(true);
    expect(checkFileType(makeFile('photo.PNG'), '.png')).toBe(true); // case-insensitive
    expect(checkFileType(makeFile('photo.jpg'), '.png,.jpg')).toBe(true);
    expect(checkFileType(makeFile('photo.gif'), '.png,.jpg')).toBe(false);
  });
  
  test('matches by exact MIME type', () => {
    expect(checkFileType(makeFile('photo.png'), 'image/png')).toBe(true);
    expect(checkFileType(makeFile('photo.jpg'), 'image/png')).toBe(false);
    expect(checkFileType(makeFile('report.pdf'), 'application/pdf')).toBe(true);
  });
  
  test('matches by wildcard MIME type', () => {
    expect(checkFileType(makeFile('photo.png'), 'image/*')).toBe(true);
    expect(checkFileType(makeFile('photo.jpg'), 'image/*')).toBe(true);
    expect(checkFileType(makeFile('animation.gif'), 'image/*')).toBe(true);
    expect(checkFileType(makeFile('report.pdf'), 'image/*')).toBe(false);
    expect(checkFileType(makeFile('readme.txt'), 'text/*')).toBe(true);
    expect(checkFileType(makeFile('readme.txt'), 'audio/*,video/*')).toBe(false);
  });
  
  test('returns false when accept demands a MIME type but extension is unknown', () => {
    expect(checkFileType(makeFile('mystery.xyz'), 'image/*')).toBe(false);
    expect(checkFileType(makeFile('mystery.xyz'), 'application/octet-stream')).toBe(false);
  });
  
  test('mixed accept entries are or-ed together', () => {
    expect(checkFileType(makeFile('photo.png'), '.gif,image/png,application/pdf')).toBe(true);
    expect(checkFileType(makeFile('photo.bmp'), '.gif,image/png,application/pdf')).toBe(false);
  });
  
  test('extension match still works without a MIME mapping', () => {
    expect(checkFileType(makeFile('archive.bin'), '.bin')).toBe(true);
    expect(checkFileType(makeFile('archive.bin'), '.zip,.bin')).toBe(true);
  });
});
