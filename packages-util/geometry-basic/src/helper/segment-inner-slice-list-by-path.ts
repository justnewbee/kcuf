import {
  TPath,
  TSegment
} from '../types';

import pointIsWithinPath from './point-is-within-path';
import segmentIntersectionWithPath from './segment-intersection-with-path';
import pointIsIncluded from './point-is-included';

/**
 * 获取线段被 path 切割并在 path 内部的所有线段
 *
 * 1. 线段在多边形之内
 * 2. 线段的其中一点在多边形之内
 * 3. 线段穿过多边形，且可能多次进出多边形
 */
export default function segmentInnerSliceListByPath(segment: TSegment, path: TPath): TSegment[] {
  const points = segmentIntersectionWithPath(segment, path);
  
  if (!pointIsIncluded(segment[0], points) && pointIsWithinPath(segment[0], path)) {
    points.unshift(segment[0]);
  }
  
  if (!pointIsIncluded(segment[1], points) && pointIsWithinPath(segment[1], path)) {
    points.push(segment[1]);
  }
  
  if (points.length < 2) {
    return [];
  }
  
  const segments: TSegment[] = [];
  
  for (let i = 0; i < points.length - 1; i += 2) {
    const p1 = points[i];
    const p2 = points[i + 1];
    
    if (p1 && p2) {
      segments.push([p1, p2]);
    }
  }
  
  return segments;
}