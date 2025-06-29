import {
  TByte
} from '../types';

import reedSolomonMultiply from './reed-solomon-multiply';

/**
 * Returns the Reed-Solomon error correction codeword for the given data and divisor polynomials.
 */
export default function reedSolomonComputeRemainder(data: readonly TByte[], divisor: readonly TByte[]): TByte[] {
  const result: TByte[] = divisor.map(_ => 0);
  
  for (const b of data) { // Polynomial division
    const factor: TByte = b ^ (result.shift() as TByte);
    
    result.push(0);
    
    divisor.forEach((coef, i) =>
      result[i] ^= reedSolomonMultiply(coef, factor));
  }
  
  return result;
}
