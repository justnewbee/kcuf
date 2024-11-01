import {
  TPath,
  TPoint
} from '../../types';
import {
  isPointIncluded
} from '../comparison';

/**
 * 往 path 放 point，保证不重复
 */
export default function pathPushPoint(path: TPath, point: TPoint): boolean {
  const pushed = !isPointIncluded(point, path);
  
  if (pushed) {
    path.push(point);
  }
  
  return pushed;
}