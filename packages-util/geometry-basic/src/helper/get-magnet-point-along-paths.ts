import {
  TPath,
  TPoint
} from '../types';

import getMagnetPointFromPathsPoints from './get-magnet-point-from-paths-points';
import getMagnetPointFromPathsSegments from './get-magnet-point-from-paths-segments';

export default function getMagnetPointAlongPaths(p: TPoint, paths: TPath[], magnetRadius: number): TPoint | null {
  const magnetResult = getMagnetPointFromPathsPoints(p, paths, magnetRadius) || getMagnetPointFromPathsSegments(p, paths, magnetRadius);
  
  return magnetResult?.[0] || null;
}