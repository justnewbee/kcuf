import {
  isBuffer
} from './util';
import md5Buffer from './md5-buffer';
import md5String from './md5-string';
import md5Unit8Array from './md5-unit8-array';

export default function md5(input: unknown): string {
  if (input === null || input === undefined || input === '') {
    return '';
  }
  
  if (input instanceof Uint8Array) {
    return md5Unit8Array(input);
  }
  
  if (input instanceof ArrayBuffer) {
    return md5Buffer(input);
  }
  
  if (isBuffer(input)) {
    return md5Buffer(input);
  }
  
  return md5String(String(input));
}
