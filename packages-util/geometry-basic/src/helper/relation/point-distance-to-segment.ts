import {
  TPoint,
  TSegment
} from '../../types';
import {
  segmentLine
} from '../base';

import pointDistanceToLine from './point-distance-to-line';

/**
 * 点到线段所在直线的距离
 */
export default function pointDistanceToSegment(point: TPoint, segment: TSegment): number {
  return pointDistanceToLine(point, segmentLine(segment));
}
