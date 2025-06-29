import {
  TBit,
  TInt
} from '../types';

import Mode from './mode';

/*
 * A segment of character/binary/control data in a QR Code symbol.
 * Instances of this class are immutable.
 * The mid-level way to create a segment is to take the payload data
 * and call a static factory function such as makeNumeric().
 * The low-level way to create a segment is to custom-make the bit buffer
 * and call the QrSegment() constructor with appropriate values.
 * This segment class imposes no length restrictions, but QR Codes have restrictions.
 * Even in the most favorable conditions, a QR Code can only hold 7089 characters of data.
 * Any segment longer than this is meaningless for the purpose of generating QR Codes.
 */
export default class QrSegment {
  // Creates a new QR Code segment with the given attributes and data.
  // The character count (numChars) must agree with the mode and the bit buffer length,
  // but the constraint isn't checked. The given bit buffer is cloned and stored.
  
  /**
   * @param mode
   *    The mode indicator of this segment
   * @param numChars
   *    The length of this segment's unencoded data. Measured in characters for
   *    numeric/alphanumeric/kanji mode, bytes for byte mode, and 0 for ECI mode.
   *    Always zero or positive. Not the same as the data's bit length.
   * @param bitData
   *    The data bits of this segment. Accessed through getData().
   */
  public constructor(readonly mode: Mode, readonly numChars: TInt, private readonly bitData: TBit[]) {
    if (numChars < 0) {
      throw new RangeError('Invalid argument');
    }
    
    this.bitData = bitData.slice(); // Make defensive copy
  }
  
  // Returns a new copy of the data bits of this segment.
  public getData(): TBit[] {
    return this.bitData.slice(); // Make defensive copy
  }
}
