import {
  IMagnetPoint,
  TPath,
  TPoint
} from '../types';

import getMagnetPointFromPathPoints from './get-magnet-point-from-path-points';
import getMagnetPointFromPathMidpoints from './get-magnet-point-from-path-midpoints';
import getMagnetPointFromPathSegments from './get-magnet-point-from-path-segments';

export default function getMagnetPointAlongPath(p: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  return getMagnetPointFromPathPoints(p, path, magnetRadius) || getMagnetPointFromPathMidpoints(p, path, magnetRadius) || getMagnetPointFromPathSegments(p, path, magnetRadius);
}