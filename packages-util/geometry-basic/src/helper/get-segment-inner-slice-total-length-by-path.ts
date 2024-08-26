import {
  TPath,
  TSegment
} from '../types';

import getSegmentLength from './get-segment-length';
import getSegmentInnerSliceListByPath from './get-segment-inner-slice-list-by-path';

export default function getSegmentInnerSliceTotalLengthByPath(segment: TSegment, path: TPath): number {
  return getSegmentInnerSliceListByPath(segment, path).reduce((result, v) => {
    return result + getSegmentLength(v);
  }, 0);
}