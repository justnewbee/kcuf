import {
  TSegment
} from '../../types';

/**
 * 获取线段在 y 轴上的投影（即 y 坐标的范围）
 */
export default function segmentProjectionY(segment: TSegment): [number, number] {
  const start = segment[0][1];
  const end = segment[1][1];
  
  return start > end ? [end, start] : [start, end];
}
