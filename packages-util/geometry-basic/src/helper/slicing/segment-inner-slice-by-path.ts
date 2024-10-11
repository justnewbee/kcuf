import {
  TPath,
  TPoint,
  TSegment
} from '../../types';
import {
  isEqualPoints,
  isPointIncluded
} from '../comparison';
import {
  isPointWithinPath,
  pathIntersectionWithSegment
} from '../relation';
import {
  segmentMidpoint
} from '../base';

function buildSegments(points: TPoint[], path: TPath): TSegment[] {
  const segments: TSegment[] = [];
  let segmentLast: TSegment | undefined;
  
  points.forEach((v, i) => {
    const pointLast = points[i - 1];
    
    if (!pointLast) { // 去掉第一个
      return;
    }
    
    const segment: TSegment = [pointLast, v];
    
    if (isPointWithinPath(segmentMidpoint(segment), path)) {
      // 凹多边形的场景，有可能会出现多个线段相连的情况，需要把这些线段连起来
      if (segmentLast && isEqualPoints(segmentLast[1], segment[0])) { // 相连了，不新增
        segmentLast[1] = segment[1];
      } else {
        segmentLast = segment;
        
        segments.push(segment);
      }
    }
  });
  
  return segments;
}

/**
 * 获取线段被 path 切割并在 path 内部的所有线段
 *
 * 1. 线段在多边形之内
 * 2. 线段的其中一点在多边形之内
 * 3. 线段穿过多边形，且可能多次进出多边形
 */
export default function segmentInnerSliceByPath(segment: TSegment, path: TPath): TSegment[] {
  const points = pathIntersectionWithSegment(path, segment);
  
  if (!isPointIncluded(segment[0], points) && isPointWithinPath(segment[0], path)) {
    points.unshift(segment[0]);
  }
  
  if (!isPointIncluded(segment[1], points) && isPointWithinPath(segment[1], path)) {
    points.push(segment[1]);
  }
  
  if (points.length < 2) {
    return [];
  }
  
  return buildSegments(points, path);
}