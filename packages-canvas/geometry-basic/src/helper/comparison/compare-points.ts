import {
  TPoint
} from '../../types';

/**
 * 比较点，按 x y 的大小顺序
 */
export default function comparePoints(point1: TPoint, point2: TPoint): number {
  return point1[0] === point2[0] ? point1[1] - point2[1] : point1[0] - point2[0];
}
