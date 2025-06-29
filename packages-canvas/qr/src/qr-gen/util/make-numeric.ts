import {
  TBit,
  TInt
} from '../types';
import QrSegment from '../class/qr-segment';
import Mode from '../class/mode';

import isNumeric from './is-numeric';
import appendBits from './apend-bits';

/**
 * Returns a segment representing the given string of decimal digits encoded in numeric mode.
 */
export default function makeNumeric(digits: string): QrSegment {
  if (!isNumeric(digits)) {
    throw new RangeError('String contains non-numeric characters');
  }
  
  const bb: TBit[] = [];
  
  for (let i = 0; i < digits.length;) { // Consume up to 3 digits per iteration
    const n: TInt = Math.min(digits.length - i, 3);
    
    appendBits(parseInt(digits.substring(i, i + n), 10), n * 3 + 1, bb);
    i += n;
  }
  
  return new QrSegment(Mode.NUMERIC, digits.length, bb);
}
