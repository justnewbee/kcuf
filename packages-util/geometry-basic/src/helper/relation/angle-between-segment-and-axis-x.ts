import {
  TSegment
} from '../../types';
import {
  segmentSlope
} from '../base';

/**
 * 获取线段与 X 轴夹角，返回弧度，范围 (-π/2, π/2]
 */
export default function angleBetweenSegmentAndAxisX(segment: TSegment): number {
  if (segment[0][0] === segment[1][0]) { // X 相等 → 垂直与 X 轴
    return Math.PI / 2;
  }
  
  return Math.atan(segmentSlope(segment)); // 范围 (-π/2, π/2)
}