import {
  TPath,
  TPoint,
  TMagnetPointResult
} from '../types';

type TGetter = (p: TPoint, paths: TPath, magnetRadius: number) => TMagnetPointResult;

/**
 * 从一组路径的所有点找举例 p 最近磁吸点及两者间距
 */
export default function getMagnetPointFromPathsBase(p: TPoint, paths: TPath[], magnetRadius: number, getter: TGetter): TMagnetPointResult {
  let magnetPoint: TPoint | undefined;
  let minMagnetDistance = Infinity;
  
  paths.forEach(v => {
    const result = getter(p, v, magnetRadius);
    
    if (!result) {
      return;
    }
    
    const [mp, distance] = result;
    
    if (distance < minMagnetDistance) {
      magnetPoint = mp;
      minMagnetDistance = distance;
    }
  });
  
  return magnetPoint ? [magnetPoint, minMagnetDistance] : null;
}