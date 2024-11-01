import {
  TPath,
  TSegment
} from '../../types';
import {
  pathEdgeCenterPoints
} from '../base';
import {
  isEqualSegments
} from '../comparison';

function pushUniqSegments(segments: TSegment[], segment: TSegment): void {
  if (!segments.some(v => isEqualSegments(v, segment))) {
    segments.push(segment);
  }
}

/**
 * 从 paths 中每个图形四个边缘点及中心点，找 path 的辅助线
 */
export default function pathsAuxiliaryList(paths: TPath[], path: TPath): TSegment[] {
  const points1 = pathEdgeCenterPoints(path);
  
  if (!points1) {
    return [];
  }
  
  const xPoints1 = [points1.l, points1.c, points1.r];
  const yPoints1 = [points1.t, points1.c, points1.b];
  
  return paths.reduce((result: TSegment[], v) => {
    const points2 = pathEdgeCenterPoints(v);
    
    if (points2) {
      for (const p1 of xPoints1) { // 找出纵向辅助线段（x 值相等）
        for (const p2 of [points2.l, points2.c, points2.r]) {
          if (Math.abs(p1[1] - p2[1]) < 1 && Math.abs(p1[0] - p2[0]) > 1) {
            pushUniqSegments(result, [p1, p2]);
          }
        }
      }
      
      for (const p1 of yPoints1) { // 找出横向辅助线段（y 值相等）
        for (const p2 of [points2.t, points2.c, points2.b]) {
          if (Math.abs(p1[0] - p2[0]) < 1 && Math.abs(p1[1] - p2[1]) > 1) {
            pushUniqSegments(result, [p1, p2]);
          }
        }
      }
    }
    
    return result;
  }, []);
}