import {
  TLine
} from '../types';
import {
  isNearlyEqual
} from '../util';

import lineStandardize from './line-standardize';

export default function lineIsEqual(line1: TLine, line2: TLine): boolean {
  const [A1, B1, C1] = lineStandardize(line1);
  const [A2, B2, C2] = lineStandardize(line2);
  
  return isNearlyEqual(A1, A2) && B1 === B2 && isNearlyEqual(C1, C2);
}