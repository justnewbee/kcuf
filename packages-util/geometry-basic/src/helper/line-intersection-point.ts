import {
  TLine,
  TPoint
} from '../types';

import noNegativeZero from './no-negative-zero';
import roundCoords from './round-coords';
import standardizeLineCoefficients from './standardize-line-coefficients';

/**
 * 两条直线相交点
 */
export default function lineIntersectionPoint(line1: TLine, line2: TLine): TPoint | null {
  const [A1, B1, C1] = standardizeLineCoefficients(line1);
  const [A2, B2, C2] = standardizeLineCoefficients(line2);
  
  if (A1 === A2 && B1 === B2) {
    return null;
  }
  
  return roundCoords([noNegativeZero((B1 * C2 - B2 * C1) / (B2 * A1 - B1 * A2)), noNegativeZero((A1 * C2 - C1 * A2) / (B1 * A2 - A1 * B2))]);
}