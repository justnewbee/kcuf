import {
  TCoords
} from '../types';

export default function calculateDistances([x1, y1]: TCoords, [x2, y2]: TCoords): [number, number, number] {
  const dx = x2 - x1;
  const dy = y2 - y1;
  
  return [Math.sqrt(dx * dx + dy * dy), dx, dy];
}