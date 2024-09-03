import {
  TPoint,
  TPath,
  TSegment
} from '../types';

import pointToPointDistance from './point-to-point-distance';
import pathSegmentList from './path-segment-list';
import segmentIntersectionPoint from './segment-intersection-point';
import is from './point-is-within-path';
import pointIsAlongPath from './point-is-along-path';

/**
 * 获取线段被 path 切割并在 path 内部的所有线段
 *
 * 1. 线段在多边形之内
 * 2. 线段的其中一点在多边形之内
 * 3. 线段穿过多边形，且可能多次进出多边形
 */
export default function getSegmentInnerSliceListByPath(segment: TSegment, path: TPath): TSegment[] {
  // 线段与 path 上所有线段的相交点
  const intersectionPointList = pathSegmentList(path).reduce((result: TPoint[], v) => {
    const intersectionPoint = segmentIntersectionPoint(segment, v);
    
    if (intersectionPoint) {
      result.push(intersectionPoint);
    }
    
    return result;
  }, []);
  
  // 当端点在路径内部（或路径上），且不在上面算出的点内，加进去，加的时候，需判断跟头尾哪个点近
  function addEndingPoint(p: TPoint): void {
    if (!is(p, path) && !pointIsAlongPath(p, path)) {
      return;
    }
    
    const intersectionPointFirst = intersectionPointList[0];
    const intersectionPointLast = intersectionPointList[intersectionPointList.length - 1];
    
    if (!intersectionPointFirst || !intersectionPointLast) {
      intersectionPointList.push(p);
      
      return;
    }
    
    const d1 = pointToPointDistance(p, intersectionPointFirst);
    const d2 = pointToPointDistance(p, intersectionPointLast);
    
    if (d1 < 1 || d2 < 1) { // 认为可能是首尾点
      return;
    }
    
    if (d1 < d2) {
      intersectionPointList.unshift(p);
    } else {
      intersectionPointList.push(p);
    }
  }
  
  addEndingPoint(segment[0]);
  addEndingPoint(segment[1]);
  
  if (intersectionPointList.length < 2) {
    return [];
  }
  
  const segments: TSegment[] = [];
  
  for (let i = 0; i < intersectionPointList.length - 1; i += 2) {
    const p1 = intersectionPointList[i];
    const p2 = intersectionPointList[i + 1];
    
    if (p1 && p2) {
      segments.push([p1, p2]);
    }
  }
  
  return segments;
}