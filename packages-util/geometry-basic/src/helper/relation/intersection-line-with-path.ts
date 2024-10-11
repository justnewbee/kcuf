import {
  TPoint,
  TPath,
  TLine
} from '../../types';
import {
  pathSegmentList
} from '../base';
import {
  comparePoints
} from '../comparison';
import {
  pathPushPoint
} from '../mutation';

import intersectionSegmentWithLine from './intersection-segment-with-line';

/**
 * path 与直线相交的点集合，优先按 x 从小到大进行排序
 */
export default function intersectionLineWithPath(line: TLine, path: TPath, sorted = true): TPoint[] {
  const points = pathSegmentList(path).reduce((result: TPoint[], v) => {
    const p = intersectionSegmentWithLine(v, line);
    
    if (p) {
      pathPushPoint(result, p);
    }
    
    return result;
  }, []);
  
  return sorted ? points.sort(comparePoints) : points;
}