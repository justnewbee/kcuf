import {
  TPoint,
  TPath
} from '../../types';
import {
  pathSegmentList
} from '../base';

import isPointOnSegment from './is-point-on-segment';

/**
 * 点是否在路径上
 */
export default function isPointOnPath(point: TPoint, path: TPath, open?: boolean): boolean {
  return pathSegmentList(path, open).some(v => isPointOnSegment(point, v), false);
}