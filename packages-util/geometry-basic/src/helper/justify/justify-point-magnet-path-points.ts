import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';
import {
  pointDistance
} from '../base';

/**
 * 从 path 的所有顶点中找距 point 最近的磁吸点
 */
export default function justifyPointMagnetPathPoints(point: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  let pointM: TPoint | undefined;
  let distance = Infinity;
  
  path.forEach(v => {
    const d = pointDistance(point, v);
    
    if (d <= magnetRadius && d < distance) {
      pointM = v;
      distance = d;
    }
  });
  
  return pointM ? {
    point: pointM,
    distance,
    order: 1
  } : null;
}