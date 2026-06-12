/**
 * @vitest-environment jsdom
 */
import {
  describe,
  test,
  expect
} from 'vitest';

import {
  md5String,
  md5Blob
} from '@kcuf/md5';

import {
  makeSureFile
} from '../src';

const HELLO_BASE64 = 'SGVsbG8sIFdvcmxkIQ==';

describe('makeSureFile', () => {
  test('returns the same File instance when given a File', async () => {
    const original = new File(['hi'], 'note.txt', {
      type: 'text/plain'
    });
    const result = await makeSureFile(original);
    
    expect(result).toBe(original);
  });
  
  test('converts a Blob into a File whose name is the md5 of its content', async () => {
    const blob = new Blob(['hello'], {
      type: 'text/plain'
    });
    const file = await makeSureFile(blob);
    
    expect(file).toBeInstanceOf(File);
    expect(file.type).toBe('text/plain');
    // Name is `${md5(content)}.txt` — the `.txt` is added by getBlobFilename via mime.
    expect(file.name).toBe(`${await md5Blob(blob)}.txt`);
  });
  
  test('converts a base64 data url into a File whose name is the md5 of the input string', async () => {
    const dataUrl = `data:text/plain;base64,${HELLO_BASE64}`;
    const file = await makeSureFile(dataUrl);
    
    expect(file).toBeInstanceOf(File);
    expect(file.type).toBe('text/plain');
    expect(file.name).toBe(`${md5String(dataUrl)}.txt`);
    expect(await file.text()).toBe('Hello, World!');
  });
});
