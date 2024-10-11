import {
  IMagnetPointResult,
  TPath,
  TPoint
} from '../../types';
import {
  pairwise
} from '../../util';
import {
  intersectionPathWithPath
} from '../relation';

import justifyPointMagnetPoints from './justify-point-magnet-points';
import justifyPointMagnetAlongPath from './justify-point-magnet-along-path';

export default function justifyPointMagnetAlongPaths(point: TPoint, paths: TPath[], magnetRadius: number): IMagnetPointResult | null {
  const possibleResults = paths.reduce((result: IMagnetPointResult[], v) => {
    const justifiedResult = justifyPointMagnetAlongPath(point, v, magnetRadius);
    
    if (justifiedResult) {
      result.push(justifiedResult);
    }
    
    return result;
  }, []);
  
  // 检测路径的交点，优先级在顶点和中点之间
  pairwise(paths).forEach(([path1, path2]) => {
    const o = justifyPointMagnetPoints(point, intersectionPathWithPath(path1, path2), magnetRadius, 1.5);
    
    if (o) {
      possibleResults.push(o);
    }
  });
  
  return possibleResults.reduce((result: IMagnetPointResult | null, v): IMagnetPointResult | null => {
    if (!result) {
      return v;
    }
    
    return v.order < result.order || (v.order === result.order && v.distance < result.distance) ? v : result;
  }, null);
}