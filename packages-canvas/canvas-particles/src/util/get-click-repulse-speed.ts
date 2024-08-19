import {
  TCoords
} from '../types';

import calculateDistances from './calculate-distances';

export default function getClickRepulseSpeed(coordsClickRepulse: TCoords, particleCoords: TCoords, repulseRadius: number): [number, number] | null {
  const [distance, dx, dy] = calculateDistances(coordsClickRepulse, particleCoords);
  const distanceDiff = repulseRadius - distance;
  
  if (distanceDiff <= 0) {
    return null;
  }
  
  const radian = Math.atan2(dy, dx);
  
  return [distanceDiff * Math.cos(radian) / 20, distanceDiff * Math.sin(radian) / 20]; // TODO config speed
}