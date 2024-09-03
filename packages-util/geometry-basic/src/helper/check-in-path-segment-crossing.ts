import {
  TPath
} from '../types';

import segmentIsCrossing from './segment-is-crossing';
import pathSegmentList from './path-segment-list';

/**
 * 检查闭合路径内，是否存在两根不相邻线段相交
 */
export default function checkInPathSegmentCrossing(path: TPath): boolean {
  if (path.length < 3) {
    return false;
  }
  
  const segments = pathSegmentList(path);
  
  for (let i = 0; i <= segments.length - 2; i++) {
    for (let j = i + 2; j < segments.length; j++) {
      if (segmentIsCrossing(segments[i]!, segments[j]!)) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
        return true;
      }
    }
  }
  
  return false;
}