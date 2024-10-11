import {
  TPoint
} from '../../types';

import segmentLength from './segment-length';

/**
 * 点到点的距离
 */
export default function pointDistance(point1: TPoint, point2: TPoint): number {
  return segmentLength([point1, point2]);
}