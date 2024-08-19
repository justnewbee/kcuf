import {
  TPoint,
  TSegment,
  TPath
} from '../types';

/**
 * 获取有序点组成的路径（三个点以上会闭合）上所有的线段
 * 
 * - 一个点 → 没有
 * - 两个点 → 一根线段
 * - 三个点及以上 → 线段的数量与点数相等
 */
export default function getSegmentList(path: TPath): TSegment[] {
  const segments: TSegment[] = [];
  let prevPoint: TPoint | null = null;
  
  path.forEach(v => {
    if (prevPoint) {
      segments.push([prevPoint, v]);
    }
    
    prevPoint = v;
  });
  
  if (path.length >= 3) {
    segments.push([path[path.length - 1]!, path[0]!]); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  return segments;
}