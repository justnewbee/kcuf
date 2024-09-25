import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import pathSegmentList from './path-segment-list';
import getVerticalIntersectionPoint from './get-vertical-intersection-point';
import segmentLength from './segment-length';

/**
 * 从 path 的所有边（不包含边的顶点）中找距 p 最近的磁吸点
 */
export default function getMagnetPointFromPathSegments(p: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  const segmentList = pathSegmentList(path);
  let point: TPoint | undefined;
  let distance = Infinity;
  
  segmentList.forEach(v => {
    const verticalIntersectionPoint = getVerticalIntersectionPoint(p, v);
    
    if (verticalIntersectionPoint) {
      const d = segmentLength([p, verticalIntersectionPoint]);
      
      if (d <= magnetRadius && d < distance) {
        point = verticalIntersectionPoint;
        distance = d;
      }
    }
  });
  
  return point ? {
    point,
    distance,
    order: 3
  } : null;
}