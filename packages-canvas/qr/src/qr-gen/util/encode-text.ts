import Ecc from '../class/ecc';
import QrCode from '../class/qr-code';

import encodeSegments from './encode-segments';
import makeSegments from './make-segments';

// Returns a QR Code representing the given Unicode text string at the given error correction level.
// As a conservative upper bound, this function is guaranteed to succeed for strings that have 738 or fewer
// Unicode code points (not UTF-16 code units) if the low error correction level is used. The smallest possible
// QR Code version is automatically chosen for the output. The ECC level of the result may be higher than the
// ecl argument if it can be done without increasing the version.
export default function encodeText(text: string, ecl: Ecc): QrCode {
  return encodeSegments(makeSegments(text), ecl);
}
