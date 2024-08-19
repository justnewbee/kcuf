import {
  TPath,
  TPoint,
  TMagnetPointResult
} from '../types';

import getMagnetPointFromPathsBase from './get-magnet-point-from-paths-base';
import getMagnetPointFromPathPoints from './get-magnet-point-from-path-points';

/**
 * 从一组路径的所有点找举例 p 最近磁吸点及两者间距
 */
export default function getMagnetPointFromPathsPoints(p: TPoint, paths: TPath[], magnetRadius: number): TMagnetPointResult {
  return getMagnetPointFromPathsBase(p, paths, magnetRadius, getMagnetPointFromPathPoints);
}