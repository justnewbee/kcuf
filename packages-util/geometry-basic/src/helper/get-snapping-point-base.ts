import {
  TPoint
} from '../types';

import pointDistance from './point-distance';

/**
 * 找到一个点 point' 满足以下条件：
 *
 * 1. fixedPoint-p2 和 fixedPoint-point' 距离相等（即 point 和 point' 在以 fixedPoint 为半径的圆周上）
 * 2. fixedPoint-point' 与水平方向的夹角是 π/4 的倍数
 * 3. p2-point' 移动距离最小
 *
 * 返回点和移动距离元组
 */
export default function getSnappingPointBase(point: TPoint, fixedPoint: TPoint, steps = 8): [TPoint, number] {
  const radius = pointDistance(fixedPoint, point);
  
  if (radius <= 0) {
    return [point, 0];
  }
  
  const radian = Math.PI * 2 / steps;
  let dMin = Infinity;
  let pointP: TPoint = point;
  
  for (let i = 0; i < steps; i++) {
    const p: TPoint = [
      fixedPoint[0] + radius * Math.cos(i * radian),
      fixedPoint[1] + radius * Math.sin(i * radian)
    ];
    const d = pointDistance(p, point);
    
    if (d < dMin) {
      dMin = d;
      pointP = p;
    }
  }
  
  return [pointP, dMin];
}