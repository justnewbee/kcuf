import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';

import justifyPointMagnetPathsBase from './justify-point-magnet-paths-base';
import justifyPointMagnetPathPoints from './justify-point-magnet-path-points';

export default function justifyPointMagnetPathsPoints(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return justifyPointMagnetPathsBase(point, paths, magnetRadius, justifyPointMagnetPathPoints);
}