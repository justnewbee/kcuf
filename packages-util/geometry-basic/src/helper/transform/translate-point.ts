import {
  TPoint
} from '../../types';

/**
 * 移动点
 */
export default function translatePoint(point: TPoint, dxy: [number, number]): TPoint {
  return [point[0] + dxy[0], point[1] + dxy[1]];
}