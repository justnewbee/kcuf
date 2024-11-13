import {
  TPath,
  TPoint,
  IPathEdgeCenterPoints
} from '../../types';
import {
  roundCoords
} from '../../util';

/**
 * 获取路径顶点的最顶端、最底端、最左边、最右边以及中心点
 */
export default function pathEdgeCenterPoints(path: TPath): IPathEdgeCenterPoints | null {
  const p0 = path[0];
  
  if (!p0) {
    return null;
  }
  
  let t: TPoint = p0;
  let r: TPoint = p0;
  let b: TPoint = p0;
  let l: TPoint = p0;
  
  for (const p of path) {
    if (p[1] < t[1]) {
      t = p;
    }
    
    if (p[1] > b[1]) {
      b = p;
    }
    
    if (p[0] < l[0]) {
      l = p;
    }
    
    if (p[0] > r[0]) {
      r = p;
    }
  }
  
  return {
    t,
    r,
    b,
    l,
    c: roundCoords([(l[0] + r[0]) * 0.5, (t[1] + b[1]) * 0.5])
  };
}
