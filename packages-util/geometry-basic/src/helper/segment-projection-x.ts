import {
  TSegment
} from '../types';

/**
 * 获取线段在 x 轴上的投影（即 x 坐标的范围）
 */
export default function segmentProjectionX(segment: TSegment): [number, number] {
  const start = segment[0][0];
  const end = segment[1][0];
  
  return start > end ? [end, start] : [start, end];
}