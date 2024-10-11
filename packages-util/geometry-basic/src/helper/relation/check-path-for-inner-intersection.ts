import {
  TPath
} from '../../types';
import {
  pathSegmentList
} from '../base';

import intersectionSegmentWithSegment from './intersection-segment-with-segment';

/**
 * 路径中存在任意不相邻线段相交
 */
export default function checkPathForInnerIntersection(path: TPath): boolean {
  const segments = pathSegmentList(path);
  
  if (segments.length <= 3) {
    return false;
  }
  
  for (let i = 0; i <= segments.length - 2; i++) {
    for (let j = i + 2; j < segments.length; j++) {
      // 不比较相邻边，只有第一条边和最末一条边需要特殊处理
      if (!(i === 0 && j === segments.length - 1) && intersectionSegmentWithSegment(segments[i]!, segments[j]!)) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
        return true;
      }
    }
  }
  
  return false;
}