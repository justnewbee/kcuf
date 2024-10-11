import {
  TPoint,
  TLine,
  TPath
} from '../../types';
import {
  pathSegmentList
} from '../base';
import {
  isPointIncluded,
  comparePaths
} from '../comparison';
import {
  intersectionSegmentWithLine,
  isSegmentCollinearWithLine,
  intersectionLineWithPath
} from '../relation';
import {
  pathPushPoint
} from '../mutation';

/**
 * 切割多边形路径，只考虑切成两块的情形
 *
 * - 若不相交（包括贴边），返回 null
 * - 相交，返回两个子 path，并且保证点的顺序和原顺序相同
 */
export default function pathSliceByLine(path: TPath, line: TLine): [TPath, TPath] | null {
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
  if (segments.some(v => isSegmentCollinearWithLine(v, line)) || intersectionLineWithPath(line, path).length !== 2) {
    return null;
  }
  
  function push(point: TPoint): void {
    pathPushPoint(currentPath, point);
  }
  
  function pushIntersection(point: TPoint): void {
    pathPushPoint(currentPath, point);
    pathPushPoint(currentPath === subPath1 ? subPath2 : subPath1, point);
  }
  
  segments.forEach(border => {
    push(border[0]);
    
    const intersection = intersectionSegmentWithLine(border, line);
    
    if (intersection) {
      intersectCount += 1;
      
      pushIntersection(intersection);
      
      // 经过 0 个顶点，相交 2 次
      // 经过 1 个顶点，相交 3 次
      // 经过 2 个顶点，相交 4 次
      // 非顶点，直接切到另一片；顶点，则需要等第二次相交再反转
      if (!isPointIncluded(intersection, path) || intersectCount % 2 === 0) {
        currentPath = currentPath === subPath1 ? subPath2 : subPath1;
      }
    }
  });
  
  return comparePaths(subPath1, subPath2) <= 0 ? [subPath1, subPath2] : [subPath2, subPath1];
}