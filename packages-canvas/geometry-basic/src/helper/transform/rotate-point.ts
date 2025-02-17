import {
  TPoint
} from '../../types';
import {
  roundCoords
} from '../../util';

/**
 * 将点绕轴心旋转一定的角度后得到新的点
 */
export default function rotatePoint(point: TPoint, pivot: TPoint, radians: number): TPoint {
  const cosValue = Math.cos(radians);
  const sinValue = Math.sin(radians);
  const deltaX = point[0] - pivot[0];
  const deltaY = point[1] - pivot[1];
  
  return roundCoords([ // 旋转矩阵
    pivot[0] + cosValue * deltaX - sinValue * deltaY,
    pivot[1] + sinValue * deltaX + cosValue * deltaY
  ]);
}
