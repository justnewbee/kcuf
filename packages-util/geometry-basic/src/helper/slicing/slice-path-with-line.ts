import {
  TPoint,
  TLine,
  TPath
} from '../../types';
import {
  pathSegmentList
} from '../base';
import {
  comparePaths,
  isEqualPointsApproximately,
  isPointIncludedApproximately
} from '../comparison';
import {
  intersectionSegmentWithLine,
  isSegmentCollinearWithLine,
  intersectionLineWithPath
} from '../relation';

/**
 * 切割多边形路径，只考虑切成两块的情形
 *
 * - 若不相交（包括贴边），返回 null
 * - 相交，返回两个子 path，并且保证点的顺序和原顺序相同
 */
export default function slicePathWithLine(path: TPath, line: TLine): [TPath, TPath] | null {
  const segments = pathSegmentList(path);
  const subPath1: TPath = [];
  const subPath2: TPath = [];
  let subPathCurrent = subPath1;
  let subPathOther = subPath2;
  
  function swapSubPaths(): void {
    [subPathCurrent, subPathOther] = [subPathOther, subPathCurrent];
  }
  
  function pushCurrent(point: TPoint): void {
    if (!isPointIncludedApproximately(point, subPathCurrent)) {
      subPathCurrent.push(point);
    }
  }
  
  function pushOther(point: TPoint): void {
    if (!isPointIncludedApproximately(point, subPathOther)) {
      subPathOther.push(point);
    }
  }
  
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
  
  segments.forEach(border => {
    const start = border[0];
    
    pushCurrent(start);
    
    const intersection = intersectionSegmentWithLine(border, line);
    
    if (intersection) {
      if (isEqualPointsApproximately(intersection, start)) {
        pushOther(intersection);
      } else {
        pushCurrent(intersection);
        pushOther(intersection);
        
        swapSubPaths();
      }
    }
  });
  
  return comparePaths(subPath1, subPath2) <= 0 ? [subPath1, subPath2] : [subPath2, subPath1];
}
