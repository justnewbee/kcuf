import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import segmentLength from './segment-length';

/**
 * 从 path 的所有顶点中找距 p 最近的磁吸点
 */
export default function getMagnetPointFromPathPoints(p: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  let point: TPoint | undefined;
  let distance = Infinity;
  
  path.forEach(v => {
    const d = segmentLength([p, v]);
    
    if (d <= magnetRadius && d < distance) {
      point = v;
      distance = d;
    }
  });
  
  return point ? {
    point,
    distance,
    order: 1
  } : null;
}