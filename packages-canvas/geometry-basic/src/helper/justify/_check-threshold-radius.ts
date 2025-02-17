import {
  TPoint
} from '../../types';
import {
  pointDistance
} from '../base';

export default function checkThresholdRadius(thresholdRadius: number, point: TPoint, pointPrime: TPoint): number {
  if (thresholdRadius <= 0) {
    return 0;
  }
  
  const distance = pointDistance(point, pointPrime);
  
  return distance <= thresholdRadius ? distance : -1;
}
