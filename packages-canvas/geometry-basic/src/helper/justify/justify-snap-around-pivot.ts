import {
  TPoint,
  IJustifySnapResult
} from '../../types';
import {
  pointDistance
} from '../base';

/**
 * 找到一个点 point' 满足以下条件：
 *
 * 1. pivot-p2 和 pivot-point' 距离相等（即 point 和 point' 在以 pivot 为半径的圆周上）
 * 2. pivot-point' 与水平方向的夹角是 π/4 的倍数
 * 3. p2-point' 移动距离最小
 *
 * 返回点和移动距离元组
 */
export default function justifySnapAroundPivot(point: TPoint, pivot: TPoint, steps = 8): IJustifySnapResult | null {
  const distance = pointDistance(pivot, point);
  
  if (distance <= 0) {
    return null;
  }
  
  const radian = Math.PI * 2 / steps;
  let dMin = Infinity;
  let pointP: TPoint = point;
  
  for (let i = 0; i < steps; i++) {
    const p: TPoint = [
      pivot[0] + distance * Math.cos(i * radian),
      pivot[1] + distance * Math.sin(i * radian)
    ];
    const d = pointDistance(p, point);
    
    if (d < dMin) {
      dMin = d;
      pointP = p;
    }
  }
  
  return {
    point: pointP,
    distance: dMin,
    theta: 0 // 不必算
  };
}
