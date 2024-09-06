import {
  TPoint,
  TLine,
  TPath
} from '../types';

import pathSegmentList from './path-segment-list';
import pathPushPoint from './path-push-point';
import pathIntersectionWithLine from './path-intersection-with-line';
import segmentIntersectionWithLine from './segment-intersection-with-line';
import pointIsIncluded from './point-is-included';

/**
 * 切割多边形路径，只考虑切成两块的情形
 */
export default function pathSplitByLine(path: TPath, line: TLine): [TPath, TPath] {
  const pathL: TPath = [];
  const pathR: TPath = [];
  let currentPath = pathL;
  let intersectCount = 0;
  
  // 不相交、只交一点（顶点的情况），或相交超 2 点（凹多边形），认为无法切，返回自身和一个空的 path
  if (pathIntersectionWithLine(path, line).length !== 2) {
    return [path, []];
  }
  
  function push(p: TPoint) {
    pathPushPoint(currentPath, p);
  }
  
  pathSegmentList(path).forEach(border => {
    push(border[0]);
    
    const intersection = segmentIntersectionWithLine(border, line);
    
    if (intersection) {
      intersectCount += 1;
      
      push(intersection);
      
      // 经过 0 个顶点，检测到相交 2 次
      // 经过 1 个顶点，检测到相交 3 次
      // 经过 2 个顶点，检测到相交 4 次
      // 非顶点，直接切到另一片，顶点，则需要等第二次相交再反转
      if (!pointIsIncluded(intersection, path) || intersectCount % 2 === 0) {
        currentPath = currentPath === pathL ? pathR : pathL;
      }
      
      push(intersection);
    }
  });
  
  return [pathL, pathR]
}