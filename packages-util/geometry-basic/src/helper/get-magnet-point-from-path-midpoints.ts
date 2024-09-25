import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import pathMidpointList from './path-midpoint-list';
import getMagnetPointFromPathPoints from './get-magnet-point-from-path-points';

/**
 * 从 path 的所有边的中点找距 p 最近的磁吸点
 */
export default function getMagnetPointFromPathMidpoints(p: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  const result = getMagnetPointFromPathPoints(p, pathMidpointList(path), magnetRadius);
  
  return result ? {
    point: result.point,
    distance: result.distance,
    order: 2
  } : null;
}