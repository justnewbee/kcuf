import md5Unit8Array from './md5-unit8-array';

export default function md5Buffer(input: Buffer | ArrayBuffer): string {
  return md5Unit8Array(new Uint8Array(input));
}
