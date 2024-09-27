import {
  TPath,
  TPoint
} from '../types';

import pointIsIncluded from './point-is-included';

/**
 * 往 path 放 point，保证不重复
 */
export default function pathPushPoint(path: TPath, point: TPoint): boolean {
  const pushed = !pointIsIncluded(point, path);
  
  if (pushed) {
    path.push(point);
  }
  
  return pushed;
}