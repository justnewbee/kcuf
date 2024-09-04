import {
  TPath,
  TSegment
} from '../types';

import segmentLength from './segment-length';
import segmentInnerSliceListByPath from './segment-inner-slice-list-by-path';

export default function segmentInnerSliceTotalLengthByPath(segment: TSegment, path: TPath): number {
  return segmentInnerSliceListByPath(segment, path).reduce((result, v) => result + segmentLength(v), 0);
}