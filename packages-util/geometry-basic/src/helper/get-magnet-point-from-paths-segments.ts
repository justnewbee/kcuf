import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import getMagnetPointFromPathsBase from './get-magnet-point-from-paths-base';
import getMagnetPointFromPathSegments from './get-magnet-point-from-path-segments';

export default function getMagnetPointFromPathsSegments(p: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return getMagnetPointFromPathsBase(p, paths, magnetRadius, getMagnetPointFromPathSegments);
}
