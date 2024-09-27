import {
  TPoint
} from '../types';
import {
  roundCoords
} from '../util';

/**
 * 将点 point 绕中心点旋转一定的角度后得到 point'
 */
export default function pointRotateAroundPoint(point: TPoint, center: TPoint, radians: number): TPoint {
  const cosValue = Math.cos(radians);
  const sinValue = Math.sin(radians);
  const deltaX = point[0] - center[0];
  const deltaY = point[1] - center[1];
  
  return roundCoords([ // 旋转矩阵
    center[0] + cosValue * deltaX - sinValue * deltaY,
    center[1] + sinValue * deltaX + cosValue * deltaY
  ]);
}
