import {
  TPath
} from '../../types';

import pathSegmentList from './path-segment-list';
import segmentLength from './segment-length';

/**
 * 获取周长
 */
export default function pathPerimeter(path: TPath): number {
  return pathSegmentList(path).reduce((result, v) => result + segmentLength(v), 0);
}