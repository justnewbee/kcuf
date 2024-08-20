import {
  TPoint
} from '../types';

import getSegmentLength from './get-segment-length';

/**
 * 找到一个点 p2' 满足以下条件：
 *
 * 1. p1-p2 和 p1-p2' 距离相等（即 p2 p2' 在以 p1 为半径的圆周上）
 * 2. p1-p2' 与水平方向的夹角是 π/4 的倍数
 * 3. p2 p2' 距离最小
 */
export default function getSnappingPoint(p1: TPoint, p2: TPoint, steps = 8): TPoint {
  const radius = getSegmentLength([p1, p2]);
  
  if (radius <= 0) {
    return p2;
  }
  
  const radian = Math.PI * 2 / steps;
  let dMin = Infinity;
  let p2Alt: TPoint = p2;
  
  for (let i = 0; i < steps; i++) {
    const p: TPoint = [
      p1[0] + radius * Math.cos(i * radian),
      p1[1] + radius * Math.sin(i * radian)
    ];
    const d = getSegmentLength([p, p2]);
    
    if (d < dMin) {
      dMin = d;
      p2Alt = p;
    }
  }
  
  return p2Alt;
}