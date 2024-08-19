import {
  TPath,
  TPoint
} from '../types';

import getMagnetPointFromPathPoints from './get-magnet-point-from-path-points';
import getMagnetPointFromPathSegments from './get-magnet-point-from-path-segments';

export default function getMagnetPointAlongPath(p: TPoint, path: TPath, magnetRadius: number): TPoint | null {
  const magnetResult = getMagnetPointFromPathPoints(p, path, magnetRadius) || getMagnetPointFromPathSegments(p, path, magnetRadius);
  
  return magnetResult?.[0] || null;
}