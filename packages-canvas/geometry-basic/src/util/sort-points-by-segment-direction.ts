import {
  TPoint,
  TSegment
} from '../types';

import getVector from './get-vector';
import getVectorDotProduct from './get-vector-dot-product';

/**
 * 按线段方向对一组点进行排序
 */
export default function sortPointsBySegmentDirection(points: TPoint[], segment: TSegment): TPoint[] {
  const [start, end] = segment;
  const vectorBase = getVector(start, end);
  
  return points.sort((p1, p2) => {
    const vectorA = getVector(start, p1);
    const vectorB = getVector(start, p2);
    
    return getVectorDotProduct(vectorA, vectorBase) - getVectorDotProduct(vectorB, vectorBase);
  });
}
