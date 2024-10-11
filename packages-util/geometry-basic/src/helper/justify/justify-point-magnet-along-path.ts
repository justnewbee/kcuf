import {
  TPath,
  TPoint,
  IMagnetPointResult
} from '../../types';
import {
  pathMidpointList,
  pathSegmentList
} from '../base';

import justifyPointMagnetPoints from './justify-point-magnet-points';
import justifyPointMagnetSegments from './justify-point-magnet-segments';

/**
 * 从路径中找磁吸点
 */
export default function justifyPointMagnetAlongPath(point: TPoint, path: TPath, magnetRadius: number): IMagnetPointResult | null {
  return justifyPointMagnetPoints(point, path, magnetRadius, 1)
      || justifyPointMagnetPoints(point, pathMidpointList(path), magnetRadius, 2)
      || justifyPointMagnetSegments(point, pathSegmentList(path), magnetRadius, 3);
}