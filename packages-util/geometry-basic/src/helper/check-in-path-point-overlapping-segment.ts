import {
  TPath
} from '../types';

import getSegmentList from './get-segment-list';
import isPointOnSegment from './is-point-on-segment';

/**
 * 检查闭合路径内，是否存在某个点恰好压在它不属于的线段上
 */
export default function checkInPathPointOverlappingSegment(path: TPath): boolean {
  if (path.length < 2) {
    return false;
  }
  
  const segmentList = getSegmentList(path); // 个数与 path 的点数相同
  
  return path.some((point, pointIndex) => {
    const ignoredLineIndexLeft = pointIndex === 0 ? segmentList.length - 1 : pointIndex;
    const ignoredLineIndexRight = pointIndex;
    
    return segmentList.some((v, index) => {
      if (index === ignoredLineIndexLeft || index === ignoredLineIndexRight) {
        return false;
      }
      
      return isPointOnSegment(point, v);
    });
  });
}