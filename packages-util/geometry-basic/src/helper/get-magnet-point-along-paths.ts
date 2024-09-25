import {
  IMagnetPoint,
  TPath,
  TPoint
} from '../types';

import getMagnetPointFromPathsPoints from './get-magnet-point-from-paths-points';
import getMagnetPointFromPathsMidpoints from './get-magnet-point-from-paths-midpoints';
import getMagnetPointFromPathsSegments from './get-magnet-point-from-paths-segments';

export default function getMagnetPointAlongPaths(p: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return getMagnetPointFromPathsPoints(p, paths, magnetRadius) || getMagnetPointFromPathsMidpoints(p, paths, magnetRadius) || getMagnetPointFromPathsSegments(p, paths, magnetRadius);
}