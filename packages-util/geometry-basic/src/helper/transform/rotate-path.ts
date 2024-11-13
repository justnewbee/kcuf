import {
  TPath,
  TPoint
} from '../../types';

import rotatePoint from './rotate-point';

export default function rotatePath(path: TPath, pivot: TPoint, radians: number): TPath {
  return path.map(v => rotatePoint(v, pivot, radians));
}
