import md5Unit8Array from './md5-unit8-array';

export default function md5String(input: string): string {
  return md5Unit8Array(new TextEncoder().encode(input));
}
