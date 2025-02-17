import {
  TPath,
  TSegment
} from '../../types';
import {
  segmentLength
} from '../base';

import segmentInnerSliceByPath from './segment-inner-slice-by-path';

export default function segmentInnerSliceTotalLengthByPath(segment: TSegment, path: TPath): number {
  return segmentInnerSliceByPath(segment, path).reduce((result, v) => result + segmentLength(v), 0);
}
