import {
  EJustifyMagnetOrder
} from '../../enum';
import {
  TPoint,
  IJustifyMagnetResult,
  TSegment
} from '../../types';
import {
  pointDistance
} from '../base';
import {
  isPointAlongSegment,
  perpendicularFootThroughPointToSegment
} from '../relation';

/**
 * 从线段列表找距 point 最近的磁吸点
 */
export default function justifyMagnetSegments(point: TPoint, segments: TSegment[], magnetRadius: number, order: EJustifyMagnetOrder): IJustifyMagnetResult | null {
  let pointM: TPoint | undefined;
  let distance = Infinity;
  
  segments.forEach(v => {
    const verticalIntersectionPoint = perpendicularFootThroughPointToSegment(point, v);
    
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
    order
  } : null;
}