import {
  TPoint
} from '../../types';
import {
  pointDistance
} from '../base';

export default function checkThresholdDistance(distance: number, point: TPoint, pointPrime: TPoint): boolean {
  return distance <= 0 || pointDistance(point, pointPrime) <= distance;
}