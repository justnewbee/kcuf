import {
  TPath,
  TPoint
} from '../types';

import pointIsEqual from './point-is-equal';

export default function pathHasPoint(path: TPath, p: TPoint): boolean {
  return path.some(v => pointIsEqual(v, p));
}