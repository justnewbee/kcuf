import {
  TSegment
} from '../../types';
import {
  segmentVector,
  angleRadians
} from '../base';

/**
 * 计算线段（可能不相交）夹角，范围 `[0, 2π)`，若传入 undirected: true 则返回范围在 `[0, π]`
 *
 *    ◉━━━━━━━◉ segment1 (from)
 *  ◉ ↙ +θ
 *   ╲
 *    ╲
 *     ◉
 *    segment2 (to)
 */
export default function angleFromSegmentToSegment(segment1: TSegment, segment2: TSegment, undirected?: boolean): number {
  return angleRadians([segmentVector(segment1), [0, 0], segmentVector(segment2)], undirected);
}