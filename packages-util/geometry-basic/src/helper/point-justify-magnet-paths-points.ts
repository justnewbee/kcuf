import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../types';

import pointJustifyMagnetPathsBase from './point-justify-magnet-paths-base';
import pointJustifyMagnetPathPoints from './point-justify-magnet-path-points';

export default function pointJustifyMagnetPathsPoints(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return pointJustifyMagnetPathsBase(point, paths, magnetRadius, pointJustifyMagnetPathPoints);
}