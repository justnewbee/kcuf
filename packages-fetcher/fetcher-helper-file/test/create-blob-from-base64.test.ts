/**
 * @vitest-environment jsdom
 */
import {
  describe,
  expect,
  test
} from 'vitest';

import {
  createBlobFromBase64
} from '../src';

// `Hello, World!` encoded as base64.
const HELLO_BASE64 = 'SGVsbG8sIFdvcmxkIQ==';

// 1x1 transparent PNG.
const PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';

async function blobBytes(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

function bytesToString(bytes: Uint8Array): string {
  return Array.from(bytes).map(v => String.fromCharCode(v)).join('');
}

describe('createBlobFromBase64', () => {
  test('uses the mime type from the data url', async () => {
    const blob = createBlobFromBase64(`data:text/plain;base64,${HELLO_BASE64}`);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/plain');
    expect(bytesToString(await blobBytes(blob))).toBe('Hello, World!');
  });

  test('falls back to magic-byte sniffing when mime is missing (PNG)', async () => {
    const blob = createBlobFromBase64(PNG_BASE64);

    expect(blob.type).toBe('image/png');

    const bytes = await blobBytes(blob);

    expect(bytes[0]).toBe(0x89);
    expect(bytes[1]).toBe(0x50);
    expect(bytes[2]).toBe(0x4E);
    expect(bytes[3]).toBe(0x47);
  });

  test('returns a typeless blob when both data url mime and magic-byte sniffing fail', async () => {
    const blob = createBlobFromBase64(HELLO_BASE64);

    expect(blob.type).toBe('');
    expect(bytesToString(await blobBytes(blob))).toBe('Hello, World!');
  });

  test('preserves arbitrary mime types from the data url', () => {
    const blob = createBlobFromBase64(`data:application/x-custom;base64,${HELLO_BASE64}`);

    expect(blob.type).toBe('application/x-custom');
  });
});
