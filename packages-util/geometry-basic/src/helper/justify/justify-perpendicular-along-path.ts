import {
  TPoint,
  TSegment,
  TPath,
  IJustifyPointPerpendicularThreshold
} from '../../types';
import {
  parseJustifyPointPerpendicularThreshold
} from '../../util';

import determineJustifiedPerpendicular from './_determine-justified-perpendicular';
import justifyPerpendicular123 from './justify-perpendicular-123';

/**
 * 在路径末尾插入一个点 point，使 point 尽可能与路径中的相邻边垂直
 */
export default function justifyPerpendicularAlongPath(point: TPoint, path: TPath, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
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
  
  return determineJustifiedPerpendicular(
      justifyPerpendicular123(point, siblingSegmentPrev, siblingSegmentNext, thresholdRadius, thresholdDegrees),
      justifyPerpendicular123(point, siblingSegmentNext, siblingSegmentPrev, thresholdRadius, thresholdDegrees)
  )?.point || null;
}
