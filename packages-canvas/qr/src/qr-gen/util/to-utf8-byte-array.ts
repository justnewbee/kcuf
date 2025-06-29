import {
  TByte
} from '../types';

/**
 * Returns a new array of bytes representing the given string encoded in UTF-8.
 */
export default function toUtf8ByteArray(str: string): TByte[] {
  const encodedStr = encodeURI(str);
  const result: TByte[] = [];
  
  for (let i = 0; i < encodedStr.length; i++) {
    if (encodedStr.charAt(i) !== '%') {
      result.push(encodedStr.charCodeAt(i));
    } else {
      result.push(parseInt(encodedStr.substring(i + 1, i + 3), 16));
      i += 2;
    }
  }
  
  return result;
}
