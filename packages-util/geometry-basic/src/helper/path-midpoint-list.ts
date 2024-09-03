import {
  TPath,
  TPoint
} from '../types';

import segmentLength from './segment-length';
import pathSegmentList from './path-segment-list';
import segmentMidpoint from './segment-midpoint';

export default function pathMidpointList(path: TPath, minDistance: number, ignoreIndexes?: number[]): (TPoint | null)[] {
  return pathSegmentList(path).map((v, i) => {
    if (ignoreIndexes?.includes(i)) {
      return null;
    }
    
    return minDistance > 0 && segmentLength(v) > minDistance ? segmentMidpoint(v) : null;
  });
}