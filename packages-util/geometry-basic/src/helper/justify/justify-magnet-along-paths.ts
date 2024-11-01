import {
  EJustifyMagnetType
} from '../../enum';
import {
  TPath,
  TPoint,
  IJustifyMagnetResult
} from '../../types';
import {
  pairwise
} from '../../util';
import {
  intersectionPathWithPath
} from '../relation';

import justifyMagnetPoints from './justify-magnet-points';
import justifyMagnetAlongPath from './justify-magnet-along-path';

export default function justifyMagnetAlongPaths(point: TPoint, paths: TPath[], magnetRadius: number): IJustifyMagnetResult | null {
  const possibleResults = paths.reduce((result: IJustifyMagnetResult[], v) => {
    const justifiedResult = justifyMagnetAlongPath(point, v, magnetRadius);
    
    if (justifiedResult) {
      result.push(justifiedResult);
    }
    
    return result;
  }, []);
  
  pairwise(paths).forEach(([path1, path2]) => {
    const o = justifyMagnetPoints(point, intersectionPathWithPath(path1, path2), magnetRadius, EJustifyMagnetType.INTERSECTION);
    
    if (o) {
      possibleResults.push(o);
    }
  });
  
  return possibleResults.reduce((result: IJustifyMagnetResult | null, v): IJustifyMagnetResult | null => {
    if (!result) {
      return v;
    }
    
    // 比较时，先用 order 小的，order 相等取 distance 小者
    return v.type < result.type || (v.type === result.type && v.distance < result.distance) ? v : result;
  }, null);
}