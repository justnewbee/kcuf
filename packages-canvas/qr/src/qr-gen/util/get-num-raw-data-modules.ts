import {
  TInt
} from '../types';
import {
  MAX_VERSION,
  MIN_VERSION
} from '../const';

import assert from './assert';

// Returns the number of data bits that can be stored in a QR Code of the given version number, after
// all function modules are excluded. This includes remainder bits, so it might not be a multiple of 8.

// The result is in the range [208, 29648]. This could be implemented as a 40-entry lookup table.
export default function getNumRawDataModules(ver: TInt): TInt {
  if (ver < MIN_VERSION || ver > MAX_VERSION) {
    throw new RangeError('Version number out of range');
  }
  
  let result: TInt = (16 * ver + 128) * ver + 64;
  
  if (ver >= 2) {
    const numAlign: TInt = Math.floor(ver / 7) + 2;
    
    result -= (25 * numAlign - 10) * numAlign - 55;
    
    if (ver >= 7) {
      result -= 36;
    }
  }
  
  assert(208 <= result && result <= 29648);
  
  return result;
}
