import {
  TPoint,
  TSegment
} from '../types';

import getSegmentEquationFactors from './get-segment-equation-factors';
import isPointInSegmentProjection from './is-point-in-segment-projection';

/**
 * 获取两根线段的相交点
 */
export default function getSegmentIntersectionPoint(segment1: TSegment, segment2: TSegment): TPoint | null {
  const [A1, B1, C1] = getSegmentEquationFactors(segment1);
  const [A2, B2, C2] = getSegmentEquationFactors(segment2);
  
  if (A1 === A2 && B1 === B2) { // 平行线无交点
    return null;
  }
  
  // 这是直线相交点，并不表示线段相交
  const intersectionPoint: TPoint = [(B1 * C2 - B2 * C1) / (B2 * A1 - B1 * A2), (A1 * C2 - C1 * A2) / (B1 * A2 - A1 * B2)];
  
  // 线段相交需判断，需判断此相交点是否在两根线段的投影之内
  return isPointInSegmentProjection(intersectionPoint, segment1) && isPointInSegmentProjection(intersectionPoint, segment2) ? intersectionPoint : null;
}