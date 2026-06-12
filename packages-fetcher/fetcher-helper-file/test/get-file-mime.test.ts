/**
 * @vitest-environment jsdom
 */
import {
  describe,
  test,
  expect
} from 'vitest';

import {
  getFileMime
} from '../src';

describe('getFileMime', () => {
  test('returns the file.type when the browser populated it', () => {
    const file = new File([''], 'photo.png', {
      type: 'image/png'
    });

    expect(getFileMime(file)).toBe('image/png');
  });

  test('falls back to deriving the MIME from the filename when file.type is empty', () => {
    const file = new File([''], 'report.pdf');

    expect(file.type).toBe(''); // sanity: jsdom does not infer type from extension
    expect(getFileMime(file)).toBe('application/pdf');
  });

  test('prefers the explicit file.type over the filename hint when both disagree', () => {
    const file = new File([''], 'photo.png', {
      type: 'image/jpeg'
    });

    expect(getFileMime(file)).toBe('image/jpeg');
  });

  test('returns empty string when both file.type and the filename are unknown', () => {
    const file = new File([''], 'mystery.xyz');

    expect(getFileMime(file)).toBe('');
  });

  test('returns empty string for a file with no extension and no type', () => {
    const file = new File([''], 'no-extension');

    expect(getFileMime(file)).toBe('');
  });
});
