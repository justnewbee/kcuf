import {
  TPath,
  TPoint,
  TMagnetPointResult
} from '../types';

import segmentLength from './segment-length';

/**
 * 从 path 的所有点中找出距 p 最近的磁吸点，返回磁吸点和间距
 */
export default function getMagnetPointFromPathPoints(p: TPoint, path: TPath, magnetRadius: number): TMagnetPointResult {
  let magnetPoint: TPoint | undefined;
  let minMagnetDistance = Infinity;
  
  path.forEach(v => {
    const distance = segmentLength([p, v]);
    
    if (distance <= magnetRadius && distance < minMagnetDistance) {
      magnetPoint = v;
      minMagnetDistance = distance;
    }
  });
  
  return magnetPoint ? [magnetPoint, minMagnetDistance] : null;
}