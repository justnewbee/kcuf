import {
  TInt
} from '../types';

/*
 * Describes how a segment's data bits are interpreted. Immutable.
 */
export default class Mode {
  static readonly NUMERIC = new Mode(0x1, [10, 12, 14]);
  static readonly ALPHANUMERIC = new Mode(0x2, [9, 11, 13]);
  static readonly BYTE = new Mode(0x4, [8, 16, 16]);
  static readonly KANJI = new Mode(0x8, [8, 10, 12]);
  static readonly ECI = new Mode(0x7, [0, 0, 0]);
  
  /**
   * @param modeBits The mode indicator bits, which is a uint4 value (range 0 to 15).
   * @param numBitsCharCount Number of character count bits for three different version ranges.
   */
  private constructor(public readonly modeBits: TInt, private readonly numBitsCharCount: [TInt, TInt, TInt]) {}
  
  /**
   * Returns the bit width of the character count field for a segment in this mode in a QR Code at the given version number.
   * The result is in the range [0, 16].
   */
  numCharCountBits(ver: TInt): TInt {
    return this.numBitsCharCount[Math.floor((ver + 7) / 17)];
  }
}
