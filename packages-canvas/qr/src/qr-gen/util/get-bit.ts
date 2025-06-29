import {
  TInt
} from '../types';

// Returns true if the i'th bit of x is set to 1.
export default function getBit(x: TInt, i: TInt): boolean {
  return ((x >>> i) & 1) !== 0;
}
