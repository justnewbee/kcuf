import {
  IJustifyPointPerpendicularThreshold
} from '../types';

const THRESHOLD_ANGLE = 5;
const THRESHOLD_DISTANCE = 0;

export default function parseJustifyPointPerpendicularThreshold(threshold: IJustifyPointPerpendicularThreshold | number = THRESHOLD_ANGLE): Required<IJustifyPointPerpendicularThreshold> {
  if (typeof threshold === 'number') {
    return {
      angle: threshold,
      radius: THRESHOLD_DISTANCE
    };
  }
  
  return {
    angle: THRESHOLD_ANGLE,
    radius: THRESHOLD_DISTANCE,
    ...threshold
  };
}