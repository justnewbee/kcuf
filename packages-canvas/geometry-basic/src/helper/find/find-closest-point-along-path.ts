import {
  TPath,
  TPoint
} from '../../types';
import {
  pathSegmentList,
  pointDistance
} from '../base';
import {
  isPointOnSegment,
  perpendicularFootThroughPointToSegment
} from '../relation';

/**
 * 从路径 path 中找距离点 point 的点，即所有线段中的垂足和顶点，哪个距离 point 最小
 */
export default function findClosestPointAlongPath(point: TPoint, path: TPath): TPoint | null {
  let distance = Infinity;
  let pointFound: TPoint | null = null;
  
  pathSegmentList(path).forEach(segment => { // 先看垂足
    const foot = perpendicularFootThroughPointToSegment(point, segment);
    
    if (isPointOnSegment(foot, segment)) {
      const d = pointDistance(point, foot);
      
      if (d < distance) {
        distance = d;
        pointFound = foot;
      }
    }
  });
  
  path.forEach(v => { // 顶点有可能比垂足还近
    const d = pointDistance(point, v);
    
    if (d < distance) {
      distance = d;
      pointFound = v;
    }
  });
  
  return pointFound;
}
