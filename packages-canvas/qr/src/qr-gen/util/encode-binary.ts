import {
  TByte
} from '../types';
import QrSegment from '../class/qr-segment';
import Ecc from '../class/ecc';
import QrCode from '../class/qr-code';

import encodeSegments from './encode-segments';
import makeBytes from './make-bytes';

// Returns a QR Code representing the given binary data at the given error correction level.
// This function always encodes using the binary segment mode, not any text mode. The maximum number of
// bytes allowed is 2953. The smallest possible QR Code version is automatically chosen for the output.
// The ECC level of the result may be higher than the ecl argument if it can be done without increasing the version.

export default function encodeBinary(data: readonly TByte[], ecl: Ecc): QrCode {
  const seg: QrSegment = makeBytes(data);
  
  return encodeSegments([seg], ecl);
}
