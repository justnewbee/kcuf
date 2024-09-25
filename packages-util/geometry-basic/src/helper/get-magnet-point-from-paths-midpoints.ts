import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import getMagnetPointFromPathsBase from './get-magnet-point-from-paths-base';
import getMagnetPointFromPathMidpoints from './get-magnet-point-from-path-midpoints';

export default function getMagnetPointFromPathsMidpoints(p: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return getMagnetPointFromPathsBase(p, paths, magnetRadius, getMagnetPointFromPathMidpoints);
}