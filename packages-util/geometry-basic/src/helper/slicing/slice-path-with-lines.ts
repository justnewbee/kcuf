import {
  TPath,
  TLine
} from '../../types';
import {
  pairwise
} from '../../util';
import {
  isPointWithinPath,
  intersectionLineWithLine
} from '../relation';
import {
  comparePaths
} from '../comparison';

import slicePathWithLine from './slice-path-with-line';

/**
 * 路径切片
 */
export default function slicePathWithLines(path: TPath, lines: TLine[]): TPath[] {
  // 限制 1：直线在 path 内部不相交
  if (pairwise(lines).some(v => {
    const p = intersectionLineWithLine(v[0], v[1]);
    
    return p ? isPointWithinPath(p, path) : false;
  })) {
    return [];
  }
  
  let subPaths: TPath[] = [path];
  
  lines.forEach(line => {
    const subPathsTemp = subPaths;
    
    subPaths = [];
    
    subPathsTemp.forEach(v => {
      const arr = slicePathWithLine(v, line);
      
      if (arr) {
        subPaths.push(...arr);
      } else {
        subPaths.push(v);
      }
    });
  });
  
  return subPaths.sort(comparePaths);
}