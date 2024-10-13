import {
  TPath,
  TSegment
} from '../../types';
import {
  pathSegmentList
} from '../base';

import isPointOnSegment from './is-point-on-segment';

/**
 * 找出路径中所有与线段相连的线段
 */
export default function findAttachedSegments(segment: TSegment, paths: TPath[]): TSegment[] {
  const [start, end] = segment;
  
  return paths.reduce((result: TSegment[], path): TSegment[] => {
    pathSegmentList(path).forEach(v => {
      if (isPointOnSegment(start, v) || isPointOnSegment(end, v)) {
        result.push(v);
      }
    });
    
    return result;
  }, []);
}