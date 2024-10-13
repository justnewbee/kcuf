import {
  TPoint
} from '../../types';
import {
  isNearlyEqual
} from '../../util';

/**
 * 检查三点是否共线
 */
export default function checkCollinear(point1: TPoint, point2: TPoint, point3: TPoint): boolean {
  const [x1, y1] = point1;
  const [x2, y2] = point2;
  const [x3, y3] = point3;
  
  return isNearlyEqual(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2), 0, 1e-12);
}