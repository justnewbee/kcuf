import {
  TPoint,
  TSegment
} from '../../types';
import {
  segmentVectorNormalized
} from '../base';
import {
  isEqualPoints
} from '../comparison';

/**
 * 判断点是否在线段内（不包括两个端点）
 */
export default function isPointInSegment(point: TPoint, segment: TSegment): boolean {
  const [start, end] = segment;
  
  return isEqualPoints(segmentVectorNormalized([start, point]), segmentVectorNormalized([point, end]));
}
