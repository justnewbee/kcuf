import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';

import justifyPointMagnetPathsBase from './justify-point-magnet-paths-base';
import justifyPointMagnetPathSegments from './justify-point-magnet-path-segments';

export default function justifyPointMagnetPathsSegments(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return justifyPointMagnetPathsBase(point, paths, magnetRadius, justifyPointMagnetPathSegments);
}
