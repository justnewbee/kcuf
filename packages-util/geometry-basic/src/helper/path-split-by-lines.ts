import {
  TPath,
  TLine
} from '../types';
import {
  pairwise
} from '../util';

import pointIsWithinPath from './point-is-within-path';
import lineIntersection from './line-intersection';
import pathSplitByLine from './path-split-by-line';
import comparePaths from './compare-paths';

/**
 * 路径切片
 */
export default function pathSplitByLines(path: TPath, lines: TLine[]): TPath[] {
  // 限制 1：直线在 path 内部不相交
  if (pairwise(lines).some(v => {
    const p = lineIntersection(v[0], v[1]);
    
    return p ? pointIsWithinPath(p, path) : false;
  })) {
    return [];
  }
  
  let subPaths: TPath[] = [path];
  let subPathsTemp: TPath[];
  
  lines.forEach(line => {
    subPathsTemp = subPaths;
    subPaths = [];
    
    subPathsTemp.forEach(v => {
      const shit = pathSplitByLine(v, line);
      
      if (shit) {
        subPaths.push(...shit)
      } else {
        subPaths.push(v);
      }
    });
  });
  
  return subPaths.sort(comparePaths);
}