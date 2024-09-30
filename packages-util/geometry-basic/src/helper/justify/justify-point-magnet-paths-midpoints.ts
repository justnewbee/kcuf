import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';

import justifyPointMagnetPathsBase from './justify-point-magnet-paths-base';
import justifyPointMagnetPathMidpoints from './justify-point-magnet-path-midpoints';

export default function justifyPointMagnetPathsMidpoints(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return justifyPointMagnetPathsBase(point, paths, magnetRadius, justifyPointMagnetPathMidpoints);
}