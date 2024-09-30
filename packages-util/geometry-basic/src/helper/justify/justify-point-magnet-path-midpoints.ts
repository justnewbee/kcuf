import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';
import {
  pathMidpointList
} from '../base';

import justifyPointMagnetPathPoints from './justify-point-magnet-path-points';

/**
 * 从 path 的所有边的中点找距 point 最近的磁吸点
 */
export default function justifyPointMagnetPathMidpoints(point: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  const result = justifyPointMagnetPathPoints(point, pathMidpointList(path), magnetRadius);
  
  return result ? {
    point: result.point,
    distance: result.distance,
    order: 2
  } : null;
}