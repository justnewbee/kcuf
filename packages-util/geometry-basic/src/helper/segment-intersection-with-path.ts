import {
  TPoint,
  TPath,
  TSegment
} from '../types';

import pointIsIncluded from './point-is-included';
import pointDistance from './point-distance';
import segmentIntersection from './segment-intersection';
import pathSegmentList from './path-segment-list';

function isSameDirection(segment1: TSegment, segment2: TSegment) {
  const [[x1, y1], [x2, y2]] = segment1;
  const [[x3, y3], [x4, y4]] = segment2;
  
  return (x2 - x1) * (x4 - x3) + (y2 - y1) * (y4 - y3) > 0; // 两个方向向量的点积
}

// 超过两个点的情况下，保证获取到的点方向和给定线段的方向一致
export function sortPoints(points: TPoint[], segment: TSegment): TPoint[] {
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];
  
  if (!firstPoint || !lastPoint || firstPoint === lastPoint) {
    return points;
  }
  
  // 首先，由于之前是按 path 进行的遍历，得到的点序列并非有序的，需要排列一下
  points.sort((v1, v2) => {
    return pointDistance(v1, firstPoint) - pointDistance(v2, firstPoint);
  });
  
  // 向量若相反，则表示需要翻转数组
  if (!isSameDirection([firstPoint, lastPoint], segment)) {
    points.reverse();
  }
  
  return points;
}

/**
 * 线段与 path 上所有线段的相交点，保证其顺序与给定线段方向一致
 */
export default function segmentIntersectionWithPath(segment: TSegment, path: TPath): TPoint[] {
  const points = pathSegmentList(path).reduce((result: TPoint[], v) => {
    const p = segmentIntersection(v, segment);
    
    if (p && !pointIsIncluded(p, result)) {
      result.push(p);
    }
    
    return result;
  }, []);
  
  return sortPoints(points, segment);
}