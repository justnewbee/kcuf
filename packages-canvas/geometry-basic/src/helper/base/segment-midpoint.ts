import {
  TPoint,
  TSegment
} from '../../types';

/**
 * 线段中点
 */
export default function segmentMidpoint(segment: TSegment): TPoint {
  const [[x1, y1], [x2, y2]] = segment;
  
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}
