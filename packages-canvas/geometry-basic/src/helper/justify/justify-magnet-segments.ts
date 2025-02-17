import {
  EJustifyMagnetType
} from '../../enum';
import {
  TPoint,
  TSegment,
  IJustifyMagnetResult
} from '../../types';
import {
  pointDistance
} from '../base';
import {
  isPointOnSegment,
  perpendicularFootThroughPointToSegment
} from '../relation';

/**
 * 从线段列表找距 point 最近的磁吸点
 */
export default function justifyMagnetSegments(point: TPoint, segments: TSegment[], magnetRadius: number, order: EJustifyMagnetType): IJustifyMagnetResult | null {
  let distance = Infinity;
  let pointM: TPoint | undefined;
  
  segments.forEach(segment => {
    const foot = perpendicularFootThroughPointToSegment(point, segment);
    
    if (isPointOnSegment(foot, segment)) {
      const d = pointDistance(point, foot);
      
      if (d <= magnetRadius && d < distance) {
        pointM = foot;
        distance = d;
      }
    }
  });
  
  return pointM ? {
    point: pointM,
    distance,
    theta: 0,
    type: order
  } : null;
}
