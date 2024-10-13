import {
  TPoint,
  IMagnetPointResult
} from '../../types';
import {
  pointDistance
} from '../base';

/**
 * 从点列表中找距 point 最近的磁吸点
 */
export default function justifyMagnetPoints(point: TPoint, points: TPoint[], magnetRadius: number, order: number): IMagnetPointResult | null {
  let pointM: TPoint | undefined;
  let distance = Infinity;
  
  points.forEach(v => {
    const d = pointDistance(point, v);
    
    if (d <= magnetRadius && d < distance) {
      pointM = v;
      distance = d;
    }
  });
  
  return pointM ? {
    point: pointM,
    distance,
    order
  } : null;
}