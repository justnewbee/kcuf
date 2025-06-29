import {
  TByte,
  TInt
} from '../types';

import assert from './assert';

/**
 * Returns the product of the two given field elements modulo GF(2^8/0x11D).
 * The arguments and result are unsigned 8-bit integers.
 * This could be implemented as a lookup table of 256*256 entries of uint8.
 */
export default function reedSolomonMultiply(x: TByte, y: TByte): TByte {
  if (x >>> 8 !== 0 || y >>> 8 !== 0) {
    throw new RangeError('Byte out of range');
  }
  
  // Russian peasant multiplication
  let z: TInt = 0;
  
  for (let i = 7; i >= 0; i--) {
    z = (z << 1) ^ ((z >>> 7) * 0x11D);
    z ^= ((y >>> i) & 1) * x;
  }
  
  assert(z >>> 8 === 0);
  
  return z as TByte;
}
