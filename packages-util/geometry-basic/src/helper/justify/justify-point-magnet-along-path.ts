import {
  IMagnetPoint,
  TPath,
  TPoint
} from '../../types';

import justifyPointMagnetPathPoints from './justify-point-magnet-path-points';
import justifyPointMagnetPathMidpoints from './justify-point-magnet-path-midpoints';
import justifyPointMagnetPathSegments from './justify-point-magnet-path-segments';

export default function justifyPointMagnetAlongPath(point: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  return justifyPointMagnetPathPoints(point, path, magnetRadius) || justifyPointMagnetPathMidpoints(point, path, magnetRadius) || justifyPointMagnetPathSegments(point, path, magnetRadius);
}