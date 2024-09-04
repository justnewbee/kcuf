import {
  TPoint,
  TPath,
  TSegment
} from '../types';

import pointDistance from './point-distance';
import segmentIntersection from './segment-intersection';
import pathSegmentList from './path-segment-list';
import pathHasPoint from './path-has-point';

/**
 * 线段与 path 上所有线段的相交点，保证其顺序与给定线段方向一致
 */
export default function segmentIntersectionWithPath(segment: TSegment, path: TPath): TPoint[] {
  const points = pathSegmentList(path).reduce((result: TPoint[], v) => {
    const p = segmentIntersection(segment, v);
    
    if (p && !pathHasPoint(result, p)) {
      result.push(p);
    }
    
    return result;
  }, []);
  
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  
  // 超过两个点的情况下，保证获取到的点方向和给定线段的方向一致
  if (firstPoint && lastPoint && firstPoint !== lastPoint && pointDistance(segment[0], firstPoint) > pointDistance(segment[0], lastPoint)) {
    points.reverse();
  }
  
  return points;
}