import {
  TPoint,
  TSegment,
  IJustifyPerpendicularResult
} from '../../types';

import justifyPerpendicular1 from './justify-perpendicular-1';
import justifyPerpendicular2 from './justify-perpendicular-2';
import justifyPerpendicular3 from './justify-perpendicular-3';
import determineJustifiedResult from './_determine-justified-result';

export default function justifyPerpendicular123(
    point: TPoint,
    siblingSegment1: TSegment,
    siblingSegment2: TSegment,
    thresholdRadius: number,
    thresholdDegrees: number
): IJustifyPerpendicularResult | null {
  const justified1 = justifyPerpendicular1(point, siblingSegment1, thresholdRadius, thresholdDegrees);
  const movingPoint = justified1?.point || point;
  const justified2 = justifyPerpendicular2(movingPoint, siblingSegment1[0], siblingSegment2[0], thresholdRadius, thresholdDegrees);
  const justified3 = justifyPerpendicular3(movingPoint, siblingSegment1[0], siblingSegment2, thresholdRadius, thresholdDegrees);
  
  return !justified2 && !justified3 ? justified1 : determineJustifiedResult([justified2, justified3]);
}