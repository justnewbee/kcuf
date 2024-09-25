import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import getMagnetPointFromPathsBase from './get-magnet-point-from-paths-base';
import getMagnetPointFromPathPoints from './get-magnet-point-from-path-points';

export default function getMagnetPointFromPathsPoints(p: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return getMagnetPointFromPathsBase(p, paths, magnetRadius, getMagnetPointFromPathPoints);
}