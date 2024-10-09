import {
  TPoint
} from '../../types';
import {
  fromRadiansToDegrees
} from '../../util';
import {
  angleThroughPoints
} from '../relation';

export default function checkThresholdAngle(angle: number, pointStart: TPoint, pointMid: TPoint, pointEnd: TPoint): boolean {
  const theta = fromRadiansToDegrees(angleThroughPoints(pointStart, pointMid, pointEnd));
  
  return theta <= angle || theta >= 360 - angle;
}