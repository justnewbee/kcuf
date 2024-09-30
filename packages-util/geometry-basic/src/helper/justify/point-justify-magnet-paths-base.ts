import {
  TPath,
  TPoint,
  IMagnetPoint
} from '../../types';

type TGetter = (point: TPoint, paths: TPath, magnetRadius: number) => IMagnetPoint | null;

export default function pointJustifyMagnetPathsBase(point: TPoint, paths: TPath[], magnetRadius: number, getter: TGetter): IMagnetPoint | null {
  return paths.reduce((result: IMagnetPoint | null, v): IMagnetPoint | null => {
    const magnetPoint = getter(point, v, magnetRadius);
    
    if (!result) {
      return magnetPoint;
    }
    
    if (!magnetPoint) {
      return result;
    }
    
    return magnetPoint.distance < result.distance || (magnetPoint.distance === result.distance && magnetPoint.order < result.order) ? magnetPoint : result;
  }, null);
}