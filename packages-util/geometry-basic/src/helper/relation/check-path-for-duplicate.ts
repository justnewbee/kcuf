import {
  TPath
} from '../../types';
import {
  isEqualPoints
} from '../comparison';

/**
 * 检查路径内是否存在重叠的点
 */
export default function checkPathForDuplicate(path: TPath): boolean {
  if (path.length < 2) {
    return false;
  }
  
  for (let i = 0; i <= path.length - 1; i++) {
    for (let j = i + 1; j < path.length; j++) {
      if (isEqualPoints(path[i]!, path[j]!)) { // eslint-disable-line @typescript-eslint/no-non-null-assertion
        return true;
      }
    }
  }
  
  return false;
}
