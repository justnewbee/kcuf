import {
  TPoint,
  TSegment,
  TPath
} from '../../types';

/**
 * 路径上所有的线段列表，默认包括首尾（三个点以上会闭合），除非传入 `open: true`
 *
 * - 一个点 → 没有
 * - 两个点 → 一根线段
 * - 三个点及以上 → 线段的数量与点数相等
 */
export default function pathSegmentList(path: TPath, open?: boolean): TSegment[] {
  const segments: TSegment[] = [];
  let prevPoint: TPoint | null = null;
  
  path.forEach(v => {
    if (prevPoint) {
      segments.push([prevPoint, v]);
    }
    
    prevPoint = v;
  });
  
  if (path.length >= 3 && !open) {
    segments.push([path[path.length - 1]!, path[0]!]); // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  return segments;
}
