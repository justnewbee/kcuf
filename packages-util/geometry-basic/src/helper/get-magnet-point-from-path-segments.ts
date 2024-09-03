import {
  TPath,
  TPoint,
  TMagnetPointResult
} from '../types';

import pathSegmentList from './path-segment-list';
import getVerticalIntersectionPoint from './get-vertical-intersection-point';
import segmentLength from './segment-length';

/**
 * 从 path 的所有边中找出距 p 最近的磁吸点，返回磁吸点和间距
 */
export default function getMagnetPointFromPathSegments(p: TPoint, path: TPath, magnetRadius: number): TMagnetPointResult {
  const segmentList = pathSegmentList(path);
  let magnetPoint: TPoint | undefined;
  let minMagnetDistance = Infinity;
  
  segmentList.forEach(v => {
    const verticalIntersectionPoint = getVerticalIntersectionPoint(p, v);
    
    if (verticalIntersectionPoint) {
      const distance = segmentLength([p, verticalIntersectionPoint]);
      
      if (distance <= magnetRadius && distance < minMagnetDistance) {
        magnetPoint = verticalIntersectionPoint;
        minMagnetDistance = distance;
      }
    }
  });
  
  return magnetPoint ? [magnetPoint, minMagnetDistance] : null;
}