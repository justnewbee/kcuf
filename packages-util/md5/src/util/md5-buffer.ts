import md5Unit8Array from './md5-unit8-array';

export default function md5Buffer(input: Buffer): string {
  return md5Unit8Array(Array.prototype.slice.call(input, 0) as unknown as Uint8Array);
}
