import {
  TPoint,
  TSegment,
  TPath,
  IJustifyPerpendicularThreshold,
  IJustifyPerpendicularResult
} from '../../types';
import {
  parseJustifyPointPerpendicularThreshold
} from '../../util';

import determineJustifiedPerpendicular from './_determine-justified-perpendicular';
import justifyPerpendicular123 from './justify-perpendicular-123';

/**
 * 在路径末插一个点 point，在一定的范围内调整 point 得到 point'，使 point' 在路径中与临边产生直角
 */
export default function justifyPerpendicularInternal(point: TPoint, path: TPath, threshold?: IJustifyPerpendicularThreshold | number): IJustifyPerpendicularResult | null {
  const {
    radius: thresholdRadius,
    angle: thresholdDegrees
  } = parseJustifyPointPerpendicularThreshold(threshold);
  const first = path[0];
  const first2 = path[1];
  const last = path[path.length - 1];
  const last2 = path[path.length - 2];
  
  if (!first || !first2 || !last || !last2) {
    return null;
  }
  
  const siblingSegmentPrev: TSegment = [first, first2];
  const siblingSegmentNext: TSegment = [last, last2];
  
  return determineJustifiedPerpendicular([
    justifyPerpendicular123(point, siblingSegmentPrev, siblingSegmentNext, thresholdRadius, thresholdDegrees),
    justifyPerpendicular123(point, siblingSegmentNext, siblingSegmentPrev, thresholdRadius, thresholdDegrees)
  ]);
}
