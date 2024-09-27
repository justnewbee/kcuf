import {
  TPoint,
  TPath
} from '../types';
import {
  fromRadiansToDegrees
} from '../util';

import angleFromSegmentToSegment from './angle-from-segment-to-segment';
import pointRotateAroundPoint from './point-rotate-around-point';

/**
 * 在路径末添加一个点，在夹角接近 90° 的时候（range 指定），纠正该点与最末一条边的夹角
 */
export default function pointJustifyRightAngle(point: TPoint, path: TPath, range = 7): TPoint | null {
  const lastPoint = path[path.length - 1];
  const lastSecondPoint = path[path.length - 2];
  
  if (!lastPoint || !lastSecondPoint) {
    return null;
  }
  
  const theta = angleFromSegmentToSegment([lastPoint, lastSecondPoint], [lastPoint, point]);
  let deltaTheta = Math.PI / 2 - theta;
  
  if (Math.abs(fromRadiansToDegrees(deltaTheta)) <= range) {
    return pointRotateAroundPoint(point, lastPoint, deltaTheta);
  }
  
  deltaTheta = 3 * Math.PI / 2 - theta;
  
  if (Math.abs(fromRadiansToDegrees(deltaTheta)) <= range) {
    return pointRotateAroundPoint(point, lastPoint, deltaTheta);
  }
  
  return null;
}