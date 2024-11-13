import {
  TPath,
  TPoint,
  TSegment
} from '../../types';
import {
  roundCoords
} from '../../util';

import segmentMidpoint from './segment-midpoint';

/**
 * 路径质心
 */
export default function pathCentroid(path: TPath): TPoint | null {
  if (!path.length) {
    return null;
  }
  
  if (path.length === 1) {
    return path[0]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  }
  
  if (path.length === 2) {
    return segmentMidpoint(path as TSegment);
  }
  
  let cx = 0;
  let cy = 0;
  let signedArea = 0;
  
  path.forEach((v, i) => {
    const [x, y] = v;
    const [xNext, yNext] = path[(i + 1) % path.length]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const a = x * yNext - xNext * y;
    
    signedArea += a;
    cx += (x + xNext) * a;
    cy += (y + yNext) * a;
  });
  
  return roundCoords([cx / (3 * signedArea), cy / (3 * signedArea)]);
}
