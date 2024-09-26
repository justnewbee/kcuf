import {
  TPoint,
  TSegment
} from '../types';

import segmentProjectionX from './segment-projection-x';
import segmentProjectionY from './segment-projection-y';

// 359.4811 <= 359.481 + 0.0001 → false 因为后者等于 359.48109999999997，所以我们用 0.01 做一个误差区间
const TOLERANCE = 0.01;

/**
 * 检测点是否落在线段的投影内，只有它落在线断的 x 以及 y 投影，才可能落在线段上，可用于预检点是否可能在线端上
 */
export default function pointIsInSegmentProjection(p: TPoint, segment: TSegment): boolean {
  const [xMin, xMax] = segmentProjectionX(segment);
  const [yMin, yMax] = segmentProjectionY(segment);
  
  return p[0] >= xMin - TOLERANCE && p[0] <= xMax + TOLERANCE && p[1] >= yMin - TOLERANCE && p[1] <= yMax + TOLERANCE;
}