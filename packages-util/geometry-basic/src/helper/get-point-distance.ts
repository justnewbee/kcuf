import {
  TPoint
} from '../types';

import getSegmentLength from './get-segment-length';

/**
 * 点到点的距离
 */
export default function getPointDistance(p1: TPoint, p2: TPoint): number {
  return getSegmentLength([p1, p2]);
}