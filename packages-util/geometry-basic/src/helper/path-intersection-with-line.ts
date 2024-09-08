import {
  TPoint,
  TPath,
  TLine
} from '../types';

import comparePoints from './compare-points';
import segmentIntersectionWithLine from './segment-intersection-with-line';
import pathSegmentList from './path-segment-list';
import pathPushPoint from './path-push-point';

/**
 * path 与直线相交的点集合，优先按 x 从小到大进行排序
 */
export default function pathIntersectionWithLine(path: TPath, line: TLine): TPoint[] {
  const points = pathSegmentList(path).reduce((result: TPoint[], v) => {
    const p = segmentIntersectionWithLine(v, line);
    
    if (p) {
      pathPushPoint(result, p);
    }
    
    return result;
  }, []);
  
  return points.sort(comparePoints);
}