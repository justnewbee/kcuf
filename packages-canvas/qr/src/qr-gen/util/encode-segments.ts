import {
  TBit,
  TByte,
  TInt
} from '../types';
import {
  MAX_VERSION,
  MIN_VERSION
} from '../const';
import QrSegment from '../class/qr-segment';
import Ecc from '../class/ecc';
import QrCode from '../class/qr-code';

import assert from './assert';
import appendBits from './apend-bits';
import getTotalBits from './get-total-bits';
import getNumDataCodewords from './get-num-data-codewords';

// Returns a QR Code representing the given segments with the given encoding parameters.
// The smallest possible QR Code version within the given range is automatically
// chosen for the output. Iff boostEcl is true, then the ECC level of the result
// may be higher than the ecl argument if it can be done without increasing the
// version. The mask number is either between 0 and 7 (inclusive) to force that
// mask, or -1 to automatically choose an appropriate mask (which may be slow).
// This function allows the user to create a custom sequence of segments that switches
// between modes (such as alphanumeric and byte) to encode text in less space.
// This is a mid-level API; the high-level API is encodeText() and encodeBinary().
export default function encodeSegments(segs: readonly QrSegment[], ecl: Ecc, minVersion: TInt = 1, maxVersion: TInt = 40, mask: TInt = -1, boostEcl = true): QrCode {
  if (!(MIN_VERSION <= minVersion && minVersion <= maxVersion && maxVersion <= MAX_VERSION)
    || mask < -1 || mask > 7) {
    throw new RangeError('Invalid value');
  }
  
  // Find the minimal version number to use
  let version: TInt;
  let dataUsedBits: TInt;
  
  for (version = minVersion; ; version++) {
    const dataCapacityBits: TInt = getNumDataCodewords(version, ecl) * 8; // Number of data bits available
    const usedBits: number = getTotalBits(segs, version);
    
    if (usedBits <= dataCapacityBits) {
      dataUsedBits = usedBits;
      
      break; // This version number is found to be suitable
    }
    
    if (version >= maxVersion) { // All versions in the range could not fit the given data
      throw new RangeError('Data too long');
    }
  }
  
  // Increase the error correction level while the data still fits in the current version number
  for (const newEcl of [Ecc.MEDIUM, Ecc.QUARTILE, Ecc.HIGH]) { // From low to high
    if (boostEcl && dataUsedBits <= getNumDataCodewords(version, newEcl) * 8) {
      ecl = newEcl;
    }
  }
  
  // Concatenate all segments to create the data bit string
  const bb: TBit[] = [];
  
  for (const seg of segs) {
    appendBits(seg.mode.modeBits, 4, bb);
    appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
    
    for (const b of seg.getData()) {
      bb.push(b);
    }
  }
  
  assert(bb.length === dataUsedBits);
  
  // Add terminator and pad up to a byte if applicable
  const dataCapacityBits: TInt = getNumDataCodewords(version, ecl) * 8;
  
  assert(bb.length <= dataCapacityBits);
  appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
  appendBits(0, (8 - bb.length % 8) % 8, bb);
  assert(bb.length % 8 === 0);
  
  // Pad with alternating bytes until data capacity is reached
  for (let padByte = 0xEC; bb.length < dataCapacityBits; padByte ^= 0xEC ^ 0x11) {
    appendBits(padByte, 8, bb);
  }
  
  // Pack bits into bytes in big endian
  const dataCodewords: TByte[] = [];
  
  while (dataCodewords.length * 8 < bb.length) {
    dataCodewords.push(0);
  }
  
  bb.forEach((b: TBit, i: TInt) => {
    dataCodewords[i >>> 3] |= b << (7 - (i & 7));
  });
  
  // Create the QR Code object
  return new QrCode(version, ecl, dataCodewords, mask);
}
