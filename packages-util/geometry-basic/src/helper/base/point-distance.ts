import {
  TPoint
} from '../../types';

/**
 * 点到点的距离
 */
export default function pointDistance(point1: TPoint, point2: TPoint): number {
  return Math.hypot(point1[0] - point2[0], point1[1] - point2[1]);
}