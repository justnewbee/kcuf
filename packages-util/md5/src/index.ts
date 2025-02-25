import { IMd5Options } from './types';

import md5Core from './md5';
import {
  bytesToStringBinary,
  cryptWordsToBytes,
  cryptBytesToHex
} from './util';

export default function md5(message: string | number[] | Uint8Array, options: IMd5Options = {}): string {
  const digestBytes = cryptWordsToBytes(md5Core(message, options));
  
  return options.asBytes ? digestBytes : options.asString ? bytesToStringBinary(digestBytes) : cryptBytesToHex(digestBytes);
}
