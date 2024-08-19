import {
  TPath,
  TPoint,
  TMagnetPointResult
} from '../types';

import getSegmentList from './get-segment-list';
import getVerticalIntersectionPoint from './get-vertical-intersection-point';
import getSegmentLength from './get-segment-length';

/**
 * 从 path 的所有边中找出距 p 最近的磁吸点，返回磁吸点和间距
 */
export default function getMagnetPointFromPathSegments(p: TPoint, path: TPath, magnetRadius: number): TMagnetPointResult {
  const segmentList = getSegmentList(path);
  let magnetPoint: TPoint | undefined;
  let minMagnetDistance = Infinity;
  
  segmentList.forEach(v => {
    const verticalIntersectionPoint = getVerticalIntersectionPoint(p, v);
    
    if (verticalIntersectionPoint) {
      const distance = getSegmentLength([p, verticalIntersectionPoint]);
      
      if (distance <= magnetRadius && distance < minMagnetDistance) {
        magnetPoint = verticalIntersectionPoint;
        minMagnetDistance = distance;
      }
    }
  });
  
  return magnetPoint ? [magnetPoint, minMagnetDistance] : null;
}