import {
  TPoint,
  TLine,
  TPath
} from '../types';

import pointIsIncluded from './point-is-included';
import segmentIntersectionWithLine from './segment-intersection-with-line';
import pathSegmentList from './path-segment-list';
import pathPushPoint from './path-push-point';
import pathIntersectionWithLine from './path-intersection-with-line';
import comparePaths from './compare-paths';
import segmentIsOnLine from './segment-is-on-line';

/**
 * 切割多边形路径，只考虑切成两块的情形
 *
 * - 若不相交（包括贴边），返回 null
 * - 相交，返回两个子 path，并且保证点的顺序和原顺序相同
 */
export default function pathSplitByLine(path: TPath, line: TLine): [TPath, TPath] | null {
  const subPath1: TPath = [];
  const subPath2: TPath = [];
  const segments = pathSegmentList(path);
  let currentPath = subPath1;
  let intersectCount = 0;
  
  /*
   * 认为无法切的情况：
   *
   * - 贴边
   * - 不相交
   * - 只交一点（顶点的情况）
   * - 相交超 2 点（凹多边形）
   */
  if (segments.some(v => segmentIsOnLine(v, line)) || pathIntersectionWithLine(path, line).length !== 2) {
    return null;
  }
  
  function push(p: TPoint) {
    pathPushPoint(currentPath, p);
  }
  
  function pushIntersection(p: TPoint) {
    pathPushPoint(currentPath, p);
    pathPushPoint(currentPath === subPath1 ? subPath2 : subPath1, p);
  }
  
  segments.forEach(border => {
    push(border[0]);
    
    const intersection = segmentIntersectionWithLine(border, line);
    
    if (intersection) {
      intersectCount += 1;
      
      pushIntersection(intersection);
      
      // 经过 0 个顶点，相交 2 次
      // 经过 1 个顶点，相交 3 次
      // 经过 2 个顶点，相交 4 次
      // 非顶点，直接切到另一片；顶点，则需要等第二次相交再反转
      if (!pointIsIncluded(intersection, path) || intersectCount % 2 === 0) {
        currentPath = currentPath === subPath1 ? subPath2 : subPath1;
      }
    }
  });
  
  return comparePaths(subPath1, subPath2) <= 0 ? [subPath1, subPath2] : [subPath2, subPath1];
}