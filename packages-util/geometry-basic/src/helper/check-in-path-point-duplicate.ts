import {
  TPath
} from '../types';

import pointIsEqual from './point-is-equal';

/**
 * 检查闭合路径内，是否存在两个点重叠
 */
export default function checkInPathPointDuplicate(path: TPath): boolean {
  if (path.length < 2) {
    return false;
  }
  
  for (let i = 0; i <= path.length - 1; i++) {
    for (let j = i + 1; j < path.length; j++) {
      if (pointIsEqual(path[i]!, path[j]!)) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
        return true;
      }
    }
  }
  
  return false;
}