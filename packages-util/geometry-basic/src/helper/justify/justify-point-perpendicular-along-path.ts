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
import justifyPointPerpendicular123 from './justify-point-perpendicular-123';

export default function justifyPointPerpendicularAlongPath(point: TPoint, path: TPath, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
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
      justifyPointPerpendicular123(point, siblingSegmentPrev, siblingSegmentNext, thresholdRadius, thresholdDegrees),
      justifyPointPerpendicular123(point, siblingSegmentNext, siblingSegmentPrev, thresholdRadius, thresholdDegrees)
  )?.point || null;
}
