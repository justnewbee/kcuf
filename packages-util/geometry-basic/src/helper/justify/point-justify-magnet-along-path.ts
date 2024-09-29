import {
  IMagnetPoint,
  TPath,
  TPoint
} from '../../types';

import pointJustifyMagnetPathPoints from './point-justify-magnet-path-points';
import pointJustifyMagnetPathMidpoints from './point-justify-magnet-path-midpoints';
import pointJustifyMagnetPathSegments from './point-justify-magnet-path-segments';

export default function pointJustifyMagnetAlongPath(point: TPoint, path: TPath, magnetRadius: number): IMagnetPoint | null {
  return pointJustifyMagnetPathPoints(point, path, magnetRadius) || pointJustifyMagnetPathMidpoints(point, path, magnetRadius) || pointJustifyMagnetPathSegments(point, path, magnetRadius);
}