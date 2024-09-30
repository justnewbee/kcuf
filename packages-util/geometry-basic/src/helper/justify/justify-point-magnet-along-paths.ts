import {
  IMagnetPoint,
  TPath,
  TPoint
} from '../../types';

import justifyPointMagnetPathsPoints from './justify-point-magnet-paths-points';
import justifyPointMagnetPathsMidpoints from './justify-point-magnet-paths-midpoints';
import justifyPointMagnetPathsSegments from './justify-point-magnet-paths-segments';

export default function justifyPointMagnetAlongPaths(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return justifyPointMagnetPathsPoints(point, paths, magnetRadius) || justifyPointMagnetPathsMidpoints(point, paths, magnetRadius) || justifyPointMagnetPathsSegments(point, paths, magnetRadius);
}