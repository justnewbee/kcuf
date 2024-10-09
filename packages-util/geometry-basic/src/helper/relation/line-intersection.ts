import {
  TLine,
  TPoint
} from '../../types';

/**
 * 直线交点
 */
export default function lineIntersection(line1: TLine, line2: TLine): TPoint | null {
  const [A1, B1, C1] = line1;
  const [A2, B2, C2] = line2;
  const D = A1 * B2 - A2 * B1;
  
  if (D === 0) { // 平行或重叠
    return null;
  }
  
  return [(B1 * C2 - B2 * C1) / D, (A2 * C1 - A1 * C2) / D];
}