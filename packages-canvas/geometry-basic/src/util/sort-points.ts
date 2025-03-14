import {
  TPoint
} from '../types';

/**
 * 对 Point 数组进行排序，优先按 x 从小到大，x 相等时按 y 从小到大
 */
export default function sortPoints(points: TPoint[]): TPoint[] {
  return points.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    
    return a[0] - b[0];
  });
}
