import {
  TPoint,
  TPath
} from '../../types';
import {
  cartesianProduct
} from '../../util';
import {
  pathSegmentList
} from '../base';
import {
  isEqualPointsApproximately
} from '../comparison';

import intersectionSegmentWithSegment from './intersection-segment-with-segment';

/**
 * 路径与路径交点集合，无序
 */
export default function intersectionPathWithPath(path1: TPath, path2: TPath): TPoint[] {
  const segments1 = pathSegmentList(path1);
  const segments2 = pathSegmentList(path2);
  
  return cartesianProduct(segments1, segments2).reduce((result: TPoint[], v) => {
    const p = intersectionSegmentWithSegment(v[0], v[1]);
    
    if (p && !result.some(vv => isEqualPointsApproximately(p, vv))) {
      result.push(p);
    }
    
    return result;
  }, []);
}
