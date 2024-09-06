import {
  TPath,
  TLine
} from '../types';
import {
  pairwise
} from '../util';

import lineIntersection from './line-intersection';
import pointIsWithinPath from './point-is-within-path';

/**
 * 路径切片，返回的顺序按直线与 path 内边交叉的先后顺序
 */
export default function pathSplitByLines(path: TPath, lines: TLine[]): TPath[] {
  // 限制 1：直线在 path 内部不相交
  if (pairwise(lines).some(v => {
    const p = lineIntersection(v[0], v[1]);
    
    return p ? pointIsWithinPath(p, path) : false;
  })) {
    return [];
  }
  
  return [
    path
  ];
}