import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import pointJustifyMagnetPathsBase from './point-justify-magnet-paths-base';
import pointJustifyMagnetPathSegments from './point-justify-magnet-path-segments';

export default function pointJustifyMagnetPathsSegments(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return pointJustifyMagnetPathsBase(point, paths, magnetRadius, pointJustifyMagnetPathSegments);
}
