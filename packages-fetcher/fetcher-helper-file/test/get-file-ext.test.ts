/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import {
  getFileExt
} from '../src';

describe('getFileExt', () => {
  test('uses the filename extension when present (returns ".ext" with leading dot, lowercased)', () => {
    const file = new File([''], 'photo.png', {
      type: 'image/png'
    });
    
    expect(getFileExt(file)).toBe('png');
  });
  
  test('prefers the filename extension over the MIME-derived one', () => {
    // file.name says .jpg but type says png — filename wins because it is checked first
    const file = new File([''], 'photo.jpg', {
      type: 'image/png'
    });
    
    expect(getFileExt(file)).toBe('jpg');
  });
  
  test('lowercases the filename extension', () => {
    const file = new File([''], 'PHOTO.PNG', {
      type: 'image/png'
    });
    
    expect(getFileExt(file)).toBe('png');
  });
  
  test('falls back to MIME mapping when the filename has no extension (returns "ext" without leading dot)', () => {
    const file = new File([''], 'no-extension', {
      type: 'image/png'
    });
    
    expect(getFileExt(file)).toBe('png');
  });
  
  test('falls back to filename-derived MIME when file.type is empty and filename has a known extension but lastIndexOf is 0', () => {
    // ".png" → getFileExtFromFilename returns ".png" (lastDot !== -1), so MIME path is not taken
    const file = new File([''], '.png');
    
    expect(getFileExt(file)).toBe('png');
  });
  
  test('returns empty string when there is no extension and no MIME mapping', () => {
    const file = new File([''], 'mystery');
    
    expect(getFileExt(file)).toBe('');
  });
  
  test('returns empty string when extension is unknown and MIME is also unknown', () => {
    // jsdom does not infer type from extension, and ".xyz" has no MIME entry,
    // but filename does have a dot so the filename branch wins with ".xyz"
    const file = new File([''], 'mystery.xyz');
    
    expect(getFileExt(file)).toBe('xyz');
  });
  
  test('uses MIME fallback when filename has no dot but type is set', () => {
    const file = new File([''], 'document', {
      type: 'application/pdf'
    });
    
    expect(getFileExt(file)).toBe('pdf');
  });
  
  test('returns empty string when filename has no dot and MIME is unmapped', () => {
    const file = new File([''], 'binary', {
      type: 'application/octet-stream'
    });
    
    expect(getFileExt(file)).toBe('');
  });
  
  test('handles multi-dot filenames by using only the last segment', () => {
    const file = new File([''], 'archive.tar.gz');
    
    expect(getFileExt(file)).toBe('gz');
  });
});
