import {
  TPoint,
  TSegment
} from '../types';

import getSegmentProjectionX from './get-segment-projection-x';
import getSegmentProjectionY from './get-segment-projection-y';

/**
 * 检测点是否落在线段的投影内，只有它落在线断的 x 以及 y 投影，才可能落在线段上，可用于预检点是否可能在线端上
 */
export default function isPointInSegmentProjection(p: TPoint, segment: TSegment): boolean {
  const [xMin, xMax] = getSegmentProjectionX(segment);
  const [yMin, yMax] = getSegmentProjectionY(segment);
  
  return p[0] >= xMin && p[0] <= xMax && p[1] >= yMin && p[1] <= yMax;
}