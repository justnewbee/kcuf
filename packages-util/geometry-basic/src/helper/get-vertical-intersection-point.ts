import {
  TPoint,
  TSegment
} from '../types';

import segmentVector from './segment-vector';
import segmentLength from './segment-length';

/**
 * 计算点到线段的垂足
 */
export default function getVerticalIntersectionPoint(point: TPoint, segment: TSegment): TPoint | null {
  const vector = segmentVector(segment);
  const length = segmentLength(segment);
  const a = segment[0];
  
  const ux = vector[0] / length; // 单位向量
  const uy = vector[1] / length; // 单位向量
  const ap = segmentVector([a, point]);
  const t = ap[0] * ux + ap[1] * uy; // 投影长度
  
  return t < 0 || t > length ? null : [a[0] + t * ux, a[1] + t * uy];
}