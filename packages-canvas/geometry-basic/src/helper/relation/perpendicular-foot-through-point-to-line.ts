import {
  TLine,
  TPoint
} from '../../types';
import {
  normalizeLine
} from '../../util';

/**
 * 点 point 到直线 line 的垂足
 *
 *     ◉ p
 *     |
 *     |
 *     |⏋↙ ?
 * ----⦿------------ line
 */
export default function perpendicularFootThroughPointToLine(point: TPoint, line: TLine): TPoint {
  const [x, y] = point;
  const [A, B, C] = normalizeLine(line);
  const AABB = A * A + B * B;
  
  return [
    x - A * (A * x + B * y + C) / AABB,
    y - B * (A * x + B * y + C) / AABB
  ];
}
