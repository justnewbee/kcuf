import {
  TPoint,
  TSegment
} from '../types';

import getSegmentVector from './get-segment-vector';
import getSegmentLength from './get-segment-length';

/**
 * 计算点到线段的垂足
 */
export default function getVerticalIntersectionPoint(p: TPoint, segment: TSegment): TPoint | null {
  const segmentVector = getSegmentVector(segment);
  const segmentLength = getSegmentLength(segment);
  const a = segment[0];
  
  const ux = segmentVector[0] / segmentLength; // 单位向量
  const uy = segmentVector[1] / segmentLength; // 单位向量
  const ap = getSegmentVector([a, p]);
  const t = ap[0] * ux + ap[1] * uy; // 投影长度
  
  return t < 0 || t > segmentLength ? null : [a[0] + t * ux, a[1] + t * uy];
}