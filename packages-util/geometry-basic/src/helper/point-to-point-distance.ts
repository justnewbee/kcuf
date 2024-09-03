import {
  TPoint
} from '../types';

import segmentLength from './segment-length';

/**
 * 点到点的距离
 */
export default function pointToPointDistance(p1: TPoint, p2: TPoint): number {
  return segmentLength([p1, p2]);
}