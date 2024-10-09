import {
  TLine,
  TPoint
} from '../../types';
import {
  standardizeLine
} from '../../util';

/**
 * 点 point 到直线 line 的垂足
 *
 *     ◉ p
 *     ┃
 *     ┃
 *     ┃⏋↙ 垂足
 * ━━━━⦿━━━━━━━━━━ line
 */
export default function perpendicularIntersectionThroughPointToLine(point: TPoint, line: TLine): TPoint {
  const [x, y] = point;
  const [A, B, C] = standardizeLine(line);
  const AABB = A * A + B * B;
  
  return [
    x - A * (A * x + B * y + C) / AABB,
    y - B * (A * x + B * y + C) / AABB
  ];
}