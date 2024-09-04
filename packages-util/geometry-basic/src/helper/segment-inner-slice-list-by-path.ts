import {
  TPath,
  TSegment
} from '../types';

import pointIsWithinPath from './point-is-within-path';
import segmentIntersectionWithPath from './segment-intersection-with-path';
import pathHasPoint from './path-has-point';

/**
 * 获取线段被 path 切割并在 path 内部的所有线段
 *
 * 1. 线段在多边形之内
 * 2. 线段的其中一点在多边形之内
 * 3. 线段穿过多边形，且可能多次进出多边形
 */
export default function segmentInnerSliceListByPath(segment: TSegment, path: TPath): TSegment[] {
  const intersectionPointList = segmentIntersectionWithPath(segment, path);
  
  if (!pathHasPoint(intersectionPointList, segment[0]) && pointIsWithinPath(segment[0], path)) {
    intersectionPointList.unshift(segment[0]);
  }
  
  if (!pathHasPoint(intersectionPointList, segment[1]) && pointIsWithinPath(segment[1], path)) {
    intersectionPointList.push(segment[1]);
  }
  
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