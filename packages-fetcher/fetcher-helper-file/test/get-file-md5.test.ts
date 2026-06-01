/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import {
  md5String,
  md5Blob
} from '@kcuf/md5';

import {
  getFileMd5
} from '../src';

describe('getFileMd5', () => {
  test('returns md5String synchronously when input is a string', () => {
    const input = 'hello';
    const result = getFileMd5(input);

    // string branch is synchronous — not a Promise
    expect(typeof result).toBe('string');
    expect(result).toBe(md5String(input));
  });

  test('returns the md5 of an empty string', () => {
    const result = getFileMd5('');

    expect(result).toBe(md5String(''));
    // sanity check on the well-known MD5("") value
    expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e');
  });

  test('produces stable output for the same string input', () => {
    expect(getFileMd5('repeatable')).toBe(getFileMd5('repeatable'));
  });

  test('different strings produce different hashes', () => {
    expect(getFileMd5('alpha')).not.toBe(getFileMd5('beta'));
  });

  test('returns a thenable for a Blob input that resolves to md5Blob output', async () => {
    const blob = new Blob(['hello'], {
      type: 'text/plain'
    });
    const result = getFileMd5(blob);

    // jsdom realm Promise !== node realm Promise, so check thenable shape instead
    expect(typeof (result as Promise<string>).then).toBe('function');
    await expect(result).resolves.toBe(await md5Blob(blob));
  });

  test('returns a thenable for a File input that resolves to md5Blob output', async () => {
    const file = new File(['hello'], 'note.txt', {
      type: 'text/plain'
    });
    const result = getFileMd5(file);

    expect(typeof (result as Promise<string>).then).toBe('function');
    // a File IS a Blob, so md5Blob accepts it directly
    await expect(result).resolves.toBe(await md5Blob(file));
  });

  test('hashes Blob content, not its metadata', async () => {
    // same bytes, different mime → same hash
    const a = new Blob(['payload'], {
      type: 'text/plain'
    });
    const b = new Blob(['payload'], {
      type: 'application/octet-stream'
    });

    expect(await getFileMd5(a)).toBe(await getFileMd5(b));
  });

  test('hashes File content, not its name', async () => {
    const a = new File(['payload'], 'one.txt');
    const b = new File(['payload'], 'two.bin');

    expect(await getFileMd5(a)).toBe(await getFileMd5(b));
  });

  test('different blob bytes yield different hashes', async () => {
    const a = new Blob(['alpha']);
    const b = new Blob(['beta']);

    expect(await getFileMd5(a)).not.toBe(await getFileMd5(b));
  });

  test('hashing a string vs a Blob with the same bytes yields the same hash', async () => {
    const text = 'matching-bytes';
    const stringHash = getFileMd5(text);
    const blobHash = await getFileMd5(new Blob([text]));

    expect(stringHash).toBe(blobHash);
  });
});
