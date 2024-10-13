import {
  EJustifyMagnetOrder
} from '../../enum';
import {
  TPath,
  TPoint,
  IJustifyMagnetResult
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
export default function justifyMagnetAlongPath(point: TPoint, path: TPath, magnetRadius: number): IJustifyMagnetResult | null {
  return justifyMagnetPoints(point, path, magnetRadius, EJustifyMagnetOrder.VERTEX)
      || justifyMagnetPoints(point, pathMidpointList(path), magnetRadius, EJustifyMagnetOrder.MID)
      || justifyMagnetSegments(point, pathSegmentList(path), magnetRadius, EJustifyMagnetOrder.OTHER);
}