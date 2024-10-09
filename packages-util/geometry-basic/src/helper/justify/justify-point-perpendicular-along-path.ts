import {
  TPoint,
  TPath,
  IJustifyPointPerpendicularThreshold
} from '../../types';
import {
  pointDistance
} from '../base';

import justifyPointPerpendicular1 from './justify-point-perpendicular-1';
import justifyPointPerpendicular2 from './justify-point-perpendicular-2';
import justifyPointPerpendicular3 from './justify-point-perpendicular-3';

export default function justifyPointPerpendicularAlongPath(point: TPoint, path: TPath, threshold?: IJustifyPointPerpendicularThreshold | number): TPoint | null {
  const point1st = path[0];
  const point2nd = path[1];
  const pointLast2nd = path[path.length - 2];
  const pointLast = path[path.length - 1];
  
  if (!point1st || !point2nd || !pointLast2nd || !pointLast) {
    return null;
  }
  
  const justifiedPoint1 = justifyPointPerpendicular1(point, pointLast, pointLast2nd, threshold);
  const activePoint = justifiedPoint1 || point;
  const justifiedPoint2 = justifyPointPerpendicular2(activePoint, pointLast, point1st, threshold);
  const justifiedPoint3 = justifyPointPerpendicular3(activePoint, pointLast, point1st, point2nd, threshold);
  
  if (!justifiedPoint2 && !justifiedPoint3) {
    return justifiedPoint1;
  }
  
  if (justifiedPoint2 && justifiedPoint3) {
    return pointDistance(activePoint, justifiedPoint2) < pointDistance(activePoint, justifiedPoint3) ? justifiedPoint2 : justifiedPoint3;
  }
  
  return justifiedPoint2 || justifiedPoint3;
}
