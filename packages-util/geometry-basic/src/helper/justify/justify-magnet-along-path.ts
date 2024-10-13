import {
  TPath,
  TPoint,
  IMagnetPointResult
} from '../../types';
import {
  pathMidpointList,
  pathSegmentList
} from '../base';

import justifyMagnetPoints from './justify-magnet-points';
import justifyMagnetSegments from './justify-magnet-segments';

/**
 * 从路径中找磁吸点
 */
export default function justifyMagnetAlongPath(point: TPoint, path: TPath, magnetRadius: number): IMagnetPointResult | null {
  return justifyMagnetPoints(point, path, magnetRadius, 1)
      || justifyMagnetPoints(point, pathMidpointList(path), magnetRadius, 2)
      || justifyMagnetSegments(point, pathSegmentList(path), magnetRadius, 3);
}