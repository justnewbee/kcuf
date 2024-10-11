import {
  IJustifyPointPerpendicularDetailed,
  TPoint,
  TSegment
} from '../../types';

import justifyPointPerpendicular1 from './justify-point-perpendicular-1';
import justifyPointPerpendicular2 from './justify-point-perpendicular-2';
import justifyPointPerpendicular3 from './justify-point-perpendicular-3';
import determineJustifiedPerpendicular from './_determine-justified-perpendicular';

export default function justifyPointPerpendicular123(
    point: TPoint,
    siblingSegment1: TSegment,
    siblingSegment2: TSegment,
    thresholdRadius: number,
    thresholdDegrees: number
): IJustifyPointPerpendicularDetailed | null {
  const justified1 = justifyPointPerpendicular1(point, siblingSegment1, thresholdRadius, thresholdDegrees);
  const movingPoint = justified1?.point || point;
  const justified2 = justifyPointPerpendicular2(movingPoint, siblingSegment1[0], siblingSegment2[0], thresholdRadius, thresholdDegrees);
  const justified3 = justifyPointPerpendicular3(movingPoint, siblingSegment1[0], siblingSegment2, thresholdRadius, thresholdDegrees);
  
  return !justified2 && !justified3 ? justified1 : determineJustifiedPerpendicular(justified2, justified3);
}