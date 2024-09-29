import {
  IMagnetPoint,
  TPath,
  TPoint
} from '../../types';

import pointJustifyMagnetPathsPoints from './point-justify-magnet-paths-points';
import pointJustifyMagnetPathsMidpoints from './point-justify-magnet-paths-midpoints';
import pointJustifyMagnetPathsSegments from './point-justify-magnet-paths-segments';

export default function pointJustifyMagnetAlongPaths(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return pointJustifyMagnetPathsPoints(point, paths, magnetRadius) || pointJustifyMagnetPathsMidpoints(point, paths, magnetRadius) || pointJustifyMagnetPathsSegments(point, paths, magnetRadius);
}