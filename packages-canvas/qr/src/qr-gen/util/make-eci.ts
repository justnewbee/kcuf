import {
  TBit,
  TInt
} from '../types';
import QrSegment from '../class/qr-segment';
import Mode from '../class/mode';

import appendBits from './apend-bits';

// Returns a segment representing an Extended Channel Interpretation
// (ECI) designator with the given assignment value.
export default function makeEci(assignVal: TInt): QrSegment {
  const bb: TBit[] = [];
  
  if (assignVal < 0) {
    throw new RangeError('ECI assignment value out of range');
  } else if (assignVal < (1 << 7)) {
    appendBits(assignVal, 8, bb);
  } else if (assignVal < (1 << 14)) {
    appendBits(0b10, 2, bb);
    appendBits(assignVal, 14, bb);
  } else if (assignVal < 1000000) {
    appendBits(0b110, 3, bb);
    appendBits(assignVal, 21, bb);
  } else { throw new RangeError('ECI assignment value out of range'); }
  
  return new QrSegment(Mode.ECI, 0, bb);
}
