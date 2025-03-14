import {
  TSegment
} from '../../types';
import {
  intersectionSegmentWithCircle
} from '../relation';
import {
  isEqualPoints
} from '../comparison';

/**
 * 以线段端点为中心，给定半径画圆，切割线段
 */
export default function sliceSegmentByRadius(segment: TSegment, radius: number, tailEnd?: boolean): TSegment[] {
  const [start, end] = segment;
  const [p] = intersectionSegmentWithCircle(segment, [tailEnd ? end : start, radius]); // 理论上不可能超过 1 个
  
  if (!p || isEqualPoints(p, start) || isEqualPoints(p, end)) {
    return [segment];
  }
  
  return [[start, p], [p, end]];
}
