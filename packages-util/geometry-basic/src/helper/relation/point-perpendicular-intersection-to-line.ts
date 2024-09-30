import {
  TLine,
  TPoint
} from '../../types';
import {
  standardizeLine
} from '../../util';

/**
 * 点到直线的垂足
 */
export default function pointPerpendicularIntersectionToLine(point: TPoint, line: TLine): TPoint {
  const [x, y] = point;
  const [A, B, C] = standardizeLine(line);
  const AABB = A * A + B * B;
  
  return [
    x - A * (A * x + B * y + C) / AABB,
    y - B * (A * x + B * y + C) / AABB
  ];
}