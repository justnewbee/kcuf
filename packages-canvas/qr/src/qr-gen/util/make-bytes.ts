import {
  TBit,
  TByte
} from '../types';
import Mode from '../class/mode';
import QrSegment from '../class/qr-segment';

import appendBits from './apend-bits';

// Returns a segment representing the given binary data encoded in
// byte mode. All input byte arrays are acceptable. Any text string
// can be converted to UTF-8 bytes and encoded as a byte mode segment.
export default function makeBytes(data: readonly TByte[]): QrSegment {
  const bb: TBit[] = [];
  
  for (const b of data) {
    appendBits(b, 8, bb);
  }
  
  return new QrSegment(Mode.BYTE, data.length, bb);
}
