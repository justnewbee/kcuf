import {
  TByte,
  TInt
} from '../types';

import reedSolomonMultiply from './reed-solomon-multiply';

/**
 * Returns a Reed-Solomon ECC generator polynomial for the given degree.
 * This could be implemented as a lookup table over all possible parameter values, instead of as an algorithm.
 */
export default function reedSolomonComputeDivisor(degree: TInt): TByte[] {
  if (degree < 1 || degree > 255) {
    throw new RangeError('Degree out of range');
  }
  
  // Polynomial coefficients are stored from highest to lowest power, excluding the leading term which is always 1.
  // For example the polynomial x^3 + 255x^2 + 8x + 93 is stored as the uint8 array [255, 8, 93].
  const result: TByte[] = [];
  
  for (let i = 0; i < degree - 1; i++) {
    result.push(0);
  }
  
  result.push(1); // Start off with the monomial x^0
  
  // Compute the product polynomial (x - r^0) * (x - r^1) * (x - r^2) * ... * (x - r^{degree-1}),
  // and drop the highest monomial term which is always 1x^degree.
  // Note that r = 0x02, which is a generator element of this field GF(2^8/0x11D).
  let root = 1;
  
  for (let i = 0; i < degree; i++) {
    // Multiply the current product by (x - r^i)
    for (let j = 0; j < result.length; j++) {
      result[j] = reedSolomonMultiply(result[j], root);
      
      if (j + 1 < result.length) {
        result[j] ^= result[j + 1];
      }
    }
    
    root = reedSolomonMultiply(root, 0x02);
  }
  
  return result;
}
