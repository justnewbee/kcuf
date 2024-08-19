import {
  round as _round
} from 'lodash-es';

import {
  TPath
} from '../types';

import getSegmentList from './get-segment-list';
import getSegmentLength from './get-segment-length';

/**
 * 获取路径围成的多边形边长
 */
export default function getPathLength(path: TPath): number {
  return _round(getSegmentList(path).reduce((result, v) => {
    return result + getSegmentLength(v);
  }, 0), 1);
}