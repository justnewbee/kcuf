import {
  TPath,
  TPoint
} from '../../types';

import segmentMidpoint from './segment-midpoint';
import pathSegmentList from './path-segment-list';

export default function pathMidpointList(path: TPath): TPoint[] {
  return pathSegmentList(path).map(segmentMidpoint);
}
