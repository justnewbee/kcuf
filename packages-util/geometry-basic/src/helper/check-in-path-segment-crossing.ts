import {
  TPath
} from '../types';

import isSegmentCrossing from './is-segment-crossing';
import getSegmentList from './get-segment-list';

/**
 * 检查闭合路径内，是否存在两根不相邻线段相交
 */
export default function checkInPathSegmentCrossing(path: TPath): boolean {
  if (path.length < 3) {
    return false;
  }
  
  const segments = getSegmentList(path);
  
  for (let i = 0; i <= segments.length - 2; i++) {
    for (let j = i + 2; j < segments.length; j++) {
      if (isSegmentCrossing(segments[i]!, segments[j]!)) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
        return true;
      }
    }
  }
  
  return false;
}