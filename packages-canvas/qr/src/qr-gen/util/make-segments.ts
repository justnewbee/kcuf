import QrSegment from '../class/qr-segment';

import isNumeric from './is-numeric';
import isAlphanumeric from './is-alphanumeric';
import makeBytes from './make-bytes';
import makeNumeric from './make-numeric';
import makeAlphanumeric from './make-alphanumeric';
import toUtf8ByteArray from './to-utf8-byte-array';

/**
 * Returns a new mutable list of zero or more segments to represent the given Unicode text string.
 * The result may use various segment modes and switch modes to optimize the length of the bit stream.
 */
export default function makeSegments(text: string): QrSegment[] {
  // Select the most efficient segment encoding automatically
  if (text === '') {
    return [];
  }
  
  if (isNumeric(text)) {
    return [makeNumeric(text)];
  }
  
  if (isAlphanumeric(text)) {
    return [makeAlphanumeric(text)];
  }
  
  return [makeBytes(toUtf8ByteArray(text))];
}
