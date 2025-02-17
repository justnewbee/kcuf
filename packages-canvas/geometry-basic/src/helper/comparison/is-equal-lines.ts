import {
  TLine
} from '../../types';
import {
  isNearlyEqual
} from '../../util';
import {
  normalizeLine
} from '../base';

export default function isEqualLines(line1: TLine, line2: TLine): boolean {
  const [A1, B1, C1] = normalizeLine(line1);
  const [A2, B2, C2] = normalizeLine(line2);
  
  return isNearlyEqual(A1, A2) && B1 === B2 && isNearlyEqual(C1, C2);
}
