import {
  TAngle
} from '../../types';
import {
  angleDegrees
} from '../base';

export default function checkThresholdAngle(thresholdDegrees: number, angle: TAngle): number {
  let degrees = angleDegrees(angle);
  
  if (degrees <= thresholdDegrees) {
    return degrees;
  }
  
  degrees = 360 - degrees;
  
  return degrees <= thresholdDegrees ? degrees : -1;
}