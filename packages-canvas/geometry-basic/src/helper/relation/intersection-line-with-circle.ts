import {
  TPoint,
  TLine,
  TCircle
} from '../../types';
import {
  sortPoints
} from '../../util';

/**
 * 直线圆的交点
 */
export default function intersectionLineWithCircle(line: TLine, circle: TCircle): TPoint[] {
  const [A, B, C] = line;
  const [center, r] = circle;
  const [x0, y0] = center;
  
  if (B === 0) {
    // 处理 B 为 0 的特殊情况，此时直线方程为 Ax + C = 0，即 x = -C / A
    const x = -C / A;
    const dy = Math.sqrt(r * r - (x - x0) * (x - x0));
    const intersections: TPoint[] = [];
    
    if (!isNaN(dy)) {
      const y1 = y0 + dy;
      const y2 = y0 - dy;
      
      intersections.push([x, y1]);
      
      if (y1 !== y2) {
        intersections.push([x, y2]);
      }
    }
    
    return sortPoints(intersections);
  }
  
  // 计算一元二次方程的系数
  const a = 1 + (A * A) / (B * B);
  const b = -2 * x0 + 2 * (A / (B * B)) * (C + B * y0);
  const c = x0 * x0 + ((C + B * y0) / B) * ((C + B * y0) / B) - r * r;
  
  // 计算判别式
  const delta = b * b - 4 * a * c;
  const intersections: TPoint[] = [];
  
  if (delta >= 0) {
    // 计算 x 的解
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    
    // 计算对应的 y 值
    const y1 = -(A / B) * x1 - (C / B);
    const y2 = -(A / B) * x2 - (C / B);
    
    intersections.push([x1, y1]);
    
    if (delta > 0) {
      intersections.push([x2, y2]);
    }
  }
  
  return sortPoints(intersections);
}
