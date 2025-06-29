import {
  TInt
} from '../types';

/*
 * The error correction level in a QR Code symbol. Immutable.
 */
export default class Ecc {
  static readonly LOW = new Ecc(0, 1); // The QR Code can tolerate about 7% erroneous codewords
  static readonly MEDIUM = new Ecc(1, 0); // The QR Code can tolerate about 15% erroneous codewords
  static readonly QUARTILE = new Ecc(2, 3); // The QR Code can tolerate about 25% erroneous codewords
  static readonly HIGH = new Ecc(3, 2); // The QR Code can tolerate about 30% erroneous codewords
  
  /**
   * @param ordinal In the range 0 to 3 (unsigned 2-bit integer)
   * @param formatBits In the range 0 to 3 (unsigned 2-bit integer)
   */
  private constructor(readonly ordinal: TInt, readonly formatBits: TInt) {}
}
