import {
  clamp as _clamp
} from 'lodash-es';

import {
  TSegment
} from '../types';

import getSegmentVector from './get-segment-vector';
import getSegmentLength from './get-segment-length';

/**
 * 获取线段夹角，返回弧度
 */
export default function getSegmentIncludedAngle(segment1: TSegment, segment2: TSegment, orientationRegardless = true): number {
  const vector1 = getSegmentVector(segment1);
  const vector2 = getSegmentVector(segment2);
  const vectorDotProduct = vector1[0] * vector2[0] + vector1[1] * vector2[1]; // 向量的点积
  const mag1 = getSegmentLength(segment1);
  const mag2 = getSegmentLength(segment2);
  const cosTheta = _clamp(vectorDotProduct / (mag1 * mag2), -1, 1);
  
  const radians = Math.acos(cosTheta); // 0-π
  
  if (orientationRegardless) { // 不论向量朝向，只返回锐角
    if (Math.abs(radians - Math.PI) < Number.EPSILON) {
      return 0;
    }
    
    if (radians > Math.PI / 2) {
      return radians - Math.PI / 2;
    }
    
    return radians;
  }
  
  return radians;
}