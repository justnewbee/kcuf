import {
  TSegment,
  TLine
} from '../../types';

/**
 * 线段转「非标准」直线，使方程 `A*x + B*y + C = 0` 成立
 */
export default function segmentLine(segment: TSegment): TLine {
  const [[x1, y1], [x2, y2]] = segment;
  const A = y2 - y1;
  const B = x1 - x2;
  const C = x2 * y1 - x1 * y2;
  
  return [A, B, C];
}
