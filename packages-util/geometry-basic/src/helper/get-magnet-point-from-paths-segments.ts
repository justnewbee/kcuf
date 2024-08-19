import {
  TPath,
  TPoint,
  TMagnetPointResult
} from '../types';

import getMagnetPointFromPathsBase from './get-magnet-point-from-paths-base';
import getMagnetPointFromPathSegments from './get-magnet-point-from-path-segments';

/**
 * 从一组路径的所有边找举例 p 最近磁吸点及两者间距
 */
export default function getMagnetPointFromPathsSegments(p: TPoint, paths: TPath[], magnetRadius: number): TMagnetPointResult {
  return getMagnetPointFromPathsBase(p, paths, magnetRadius, getMagnetPointFromPathSegments);
}
