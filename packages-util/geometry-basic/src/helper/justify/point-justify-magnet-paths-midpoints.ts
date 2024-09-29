import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';

import pointJustifyMagnetPathsBase from './point-justify-magnet-paths-base';
import pointJustifyMagnetPathMidpoints from './point-justify-magnet-path-midpoints';

export default function pointJustifyMagnetPathsMidpoints(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPoint | null {
  return pointJustifyMagnetPathsBase(point, paths, magnetRadius, pointJustifyMagnetPathMidpoints);
}