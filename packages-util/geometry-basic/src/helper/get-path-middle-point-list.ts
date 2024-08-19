import {
  TPath,
  TPoint
} from '../types';

import getSegmentLength from './get-segment-length';
import getSegmentList from './get-segment-list';
import getSegmentMiddlePoint from './get-segment-middle-point';

export default function getPathMiddlePointList(path: TPath, minDistance: number, ignoreIndexes?: number[]): (TPoint | null)[] {
  return getSegmentList(path).map((v, i) => {
    if (ignoreIndexes?.includes(i)) {
      return null;
    }
    
    return minDistance > 0 && getSegmentLength(v) > minDistance ? getSegmentMiddlePoint(v) : null;
  });
}