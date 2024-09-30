import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';
import {
  pointDistance,
  pathSegmentList
} from '../base';
import {
  isPointAlongSegment,
  pointPerpendicularIntersectionToSegment
} from '../relation';

/**
 * 从 path 的所有边（不包含边的顶点）中找距 point 最近的磁吸点
 */
export default function justifyPointMagnetPathSegments(point: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  const segmentList = pathSegmentList(path);
  let pointM: TPoint | undefined;
  let distance = Infinity;
  
  segmentList.forEach(v => {
    const verticalIntersectionPoint = pointPerpendicularIntersectionToSegment(point, v);
    
    if (isPointAlongSegment(verticalIntersectionPoint, v)) {
      const d = pointDistance(point, verticalIntersectionPoint);
      
      if (d <= magnetRadius && d < distance) {
        pointM = verticalIntersectionPoint;
        distance = d;
      }
    }
  });
  
  return pointM ? {
    point: pointM,
    distance,
    order: 3
  } : null;
}