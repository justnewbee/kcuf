import {
  TLine
} from '../../types';
import {
  isNearlyEqual,
  standardizeLine
} from '../../util';

export default function isEqualLines(line1: TLine, line2: TLine): boolean {
  const [A1, B1, C1] = standardizeLine(line1);
  const [A2, B2, C2] = standardizeLine(line2);
  
  return isNearlyEqual(A1, A2) && B1 === B2 && isNearlyEqual(C1, C2);
}