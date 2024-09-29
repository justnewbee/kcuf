import {
  TPath,
  TLine
} from '../../types';
import {
  pairwise
} from '../../util';
import {
  isPointWithinPath,
  lineIntersection
} from '../relation';
import {
  comparePaths
} from '../comparison';

import pathSliceByLine from './path-slice-by-line';

/**
 * 路径切片
 */
export default function pathSliceByLines(path: TPath, lines: TLine[]): TPath[] {
  // 限制 1：直线在 path 内部不相交
  if (pairwise(lines).some(v => {
    const p = lineIntersection(v[0], v[1]);
    
    return p ? isPointWithinPath(p, path) : false;
  })) {
    return [];
  }
  
  let subPaths: TPath[] = [path];
  let subPathsTemp: TPath[];
  
  lines.forEach(line => {
    subPathsTemp = subPaths;
    subPaths = [];
    
    subPathsTemp.forEach(v => {
      const shit = pathSliceByLine(v, line);
      
      if (shit) {
        subPaths.push(...shit);
      } else {
        subPaths.push(v);
      }
    });
  });
  
  return subPaths.sort(comparePaths);
}