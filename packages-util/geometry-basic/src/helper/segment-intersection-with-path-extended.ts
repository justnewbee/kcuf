import {
  TPoint,
  TPath,
  TSegment
} from '../types';

import pointIsIncluded from './point-is-included';
import segmentIntersectionWithLine from './segment-intersection-with-line';
import segmentToLine from './segment-to-line';
import pathSegmentList from './path-segment-list';
import {
  sortPoints
} from './segment-intersection-with-path';

/**
 * 线段所在的直线（即可能需延长线段）与 path 上所有线段的相交点，保证其顺序与给定线段方向一致
 */
export default function segmentIntersectionWithPathExtended(segment: TSegment, path: TPath): TPoint[] {
  const line = segmentToLine(segment);
  const points = pathSegmentList(path).reduce((result: TPoint[], v) => {
    const p = segmentIntersectionWithLine(v, line);
    
    if (p && !pointIsIncluded(p, result)) {
      result.push(p);
    }
    
    return result;
  }, []);
  
  return sortPoints(points, segment);
}