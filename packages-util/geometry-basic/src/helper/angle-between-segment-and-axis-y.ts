import {
  TSegment
} from '../types';

import segmentSlope from './segment-slope';

/**
 * 获取线段与 Y 轴夹角，返回弧度，范围 (-π/2, π/2]
 */
export default function angleBetweenSegmentAndAxisY(segment: TSegment): number {
  if (segment[0][1] === segment[1][1]) { // Y 相等 → 垂直与 Y 轴
    return Math.PI / 2;
  }
  
  return Math.atan(-1 / segmentSlope(segment)); // 斜率不可能是 0
}