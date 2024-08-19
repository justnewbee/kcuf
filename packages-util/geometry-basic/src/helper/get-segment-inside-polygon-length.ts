import {
  TPoint,
  TPath,
  TSegment
} from '../types';

import getSegmentList from './get-segment-list';
import getSegmentLength from './get-segment-length';
import getSegmentIntersectionPoint from './get-segment-intersection-point';
import isPointInsidePolygon from './is-point-inside-polygon';

/**
 * 获取线段在多边形中的长度，包括以下场景：
 * 
 * 1. 线段在多边形之内
 * 2. 线段的其中一点在多边形之内
 * 3. 线段穿过多边形，且可能多次进出多边形
 */
export default function getSegmentInsidePolygonLength(segment: TSegment, polygon: TPath): number {
  const intersectionPointList = getSegmentList(polygon).reduce((result: TPoint[], v) => {
    const intersectionPoint = getSegmentIntersectionPoint(segment, v);
    
    if (intersectionPoint) {
      result.push(intersectionPoint);
    }
    
    return result;
  }, []);
  const [segmentStart, segmentEnd] = segment;
  
  if (isPointInsidePolygon(segmentStart, polygon)) {
    intersectionPointList.unshift(segmentStart);
  }
  
  if (isPointInsidePolygon(segmentEnd, polygon)) {
    intersectionPointList.push(segmentEnd);
  }
  
  if (intersectionPointList.length < 2) {
    return 0;
  }
  
  intersectionPointList.sort((v1, v2) => getSegmentLength([segmentStart, v1]) - getSegmentLength([segmentStart, v2]));
  
  let totalLength = 0;
  
  for (let i = 0; i < intersectionPointList.length - 1; i += 2) {
    const p1 = intersectionPointList[i];
    const p2 = intersectionPointList[i + 1];
    
    if (p1 && p2) {
      totalLength += getSegmentLength([p1, p2]);
    }
  }
  
  return totalLength;
}