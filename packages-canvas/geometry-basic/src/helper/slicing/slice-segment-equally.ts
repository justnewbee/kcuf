import {
  TPoint,
  TVector,
  TSegment
} from '../../types';
import {
  segmentVector
} from '../base';

/**
 * 将线段切割成 n 等分，返回线段数组
 */
export default function sliceSegmentEqually(segment: TSegment, n: number): TSegment[] {
  if (n < 2) {
    return [segment];
  }
  
  const vector = segmentVector(segment);
  const vectorStep: TVector = [vector[0] / n, vector[1] / n];
  const [start, end] = segment;
  const segments: TSegment[] = [];
  let prev = start;
  
  for (let i = 1; i < n; i++) {
    const point: TPoint = [
      start[0] + vectorStep[0] * i,
      start[1] + vectorStep[1] * i
    ];
    
    segments.push([prev, point]);
    prev = point;
  }
  
  segments.push([prev, end]);
  
  return segments;
}
