import {
  TBit,
  TInt
} from '../types';

// Appends the given number of low-order bits of the given value
// to the given buffer. Requires 0 <= len <= 31 and 0 <= val < 2^len.
export default function appendBits(val: TInt, len: TInt, bb: TBit[]): void {
  if (len < 0 || len > 31 || val >>> len !== 0) {
    throw new RangeError('Value out of range');
  }
  
  for (let i = len - 1; i >= 0; i--) {// Append bit by bit
    bb.push((val >>> i) & 1);
  }
}
