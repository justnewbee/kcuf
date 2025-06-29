import {
  TInt
} from '../types';
import QrSegment from '../class/qr-segment';

/**
 * Calculates and returns the number of bits needed to encode the given segments at the given version.
 * The result is infinity if a segment has too many characters to fit its length field.
 */
export default function getTotalBits(segments: readonly QrSegment[], version: TInt): number {
  let result = 0;
  
  for (const v of segments) {
    const ccbits: TInt = v.mode.numCharCountBits(version);
    
    if (v.numChars >= (1 << ccbits)) { // The segment's length doesn't fit the field's bit width
      return Infinity;
    }
    
    result += 4 + ccbits + v.bitData.length;
  }
  
  return result;
}
