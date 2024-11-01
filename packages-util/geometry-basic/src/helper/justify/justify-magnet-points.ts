import {
  EJustifyMagnetType
} from '../../enum';
import {
  TPoint,
  IJustifyMagnetResult
} from '../../types';
import {
  pointDistance
} from '../base';

/**
 * 从点列表中找距 point 最近的磁吸点
 */
export default function justifyMagnetPoints(point: TPoint, points: TPoint[], magnetRadius: number, order: EJustifyMagnetType): IJustifyMagnetResult | null {
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
    theta: 0,
    type: order
  } : null;
}