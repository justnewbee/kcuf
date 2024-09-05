import {
  round as _round
} from 'lodash-es';

import {
  TPath
} from '../types';

import pathSegmentList from './path-segment-list';
import segmentLength from './segment-length';

/**
 * 获取路径围成的多边形边长
 */
export default function pathPerimeter(path: TPath): number {
  return _round(pathSegmentList(path).reduce((result, v) => {
    return result + segmentLength(v);
  }, 0), 2);
}