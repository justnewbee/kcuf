import {
  TPoint,
  TPath,
  TSegment
} from '../types';

import getPointDistance from './get-point-distance';
import getSegmentList from './get-segment-list';
import getSegmentIntersectionPoint from './get-segment-intersection-point';
import isPointInPath from './is-point-in-path';
import isPointOnPath from './is-point-on-path';

/**
 * 获取线段被 path 切割并在 path 内部的所有线段
 *
 * 1. 线段在多边形之内
 * 2. 线段的其中一点在多边形之内
 * 3. 线段穿过多边形，且可能多次进出多边形
 */
export default function getSegmentInnerSliceListByPath(segment: TSegment, path: TPath): TSegment[] {
  // 线段与 path 上所有线段的相交点
  const intersectionPointList = getSegmentList(path).reduce((result: TPoint[], v) => {
    const intersectionPoint = getSegmentIntersectionPoint(segment, v);
    
    if (intersectionPoint) {
      result.push(intersectionPoint);
    }
    
    return result;
  }, []);
  
  // 当端点在路径内部（或路径上），且不在上面算出的点内，加进去，加的时候，需判断跟头尾哪个点近
  function addEndingPoint(p: TPoint): void {
    if (!isPointInPath(p, path) && !isPointOnPath(p, path)) {
      return;
    }
    
    const intersectionPointFirst = intersectionPointList[0];
    const intersectionPointLast = intersectionPointList[intersectionPointList.length - 1];
    
    if (!intersectionPointFirst || !intersectionPointLast) {
      intersectionPointList.push(p);
      
      return;
    }
    
    const d1 = getPointDistance(p, intersectionPointFirst);
    const d2 = getPointDistance(p, intersectionPointLast);
    
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