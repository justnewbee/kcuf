/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import getBlobFilename from '../src/helper/get-blob-filename';

describe('getBlobFilename', () => {
  test('keeps the filename when it already has an extension', () => {
    const blob = new Blob([''], {
      type: 'image/png'
    });
    
    expect(getBlobFilename(blob, 'photo.jpg')).toBe('photo.jpg');
    expect(getBlobFilename(blob, 'archive.tar.gz')).toBe('archive.tar.gz');
  });
  
  test('appends an extension based on the blob mime type when missing', () => {
    expect(getBlobFilename(new Blob([''], {
      type: 'image/png'
    }), 'photo')).toBe('photo.png');
    expect(getBlobFilename(new Blob([''], {
      type: 'application/pdf'
    }), 'report')).toBe('report.pdf');
  });
  
  test('returns the filename unchanged when the mime type is unknown', () => {
    expect(getBlobFilename(new Blob([''], {
      type: 'application/octet-stream'
    }), 'data')).toBe('data');
    expect(getBlobFilename(new Blob(['']), 'data')).toBe('data');
  });
});
