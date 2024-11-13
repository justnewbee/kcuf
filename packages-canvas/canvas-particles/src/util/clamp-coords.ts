import {
  TCoords
} from '../types';

import clamp from './clamp';

export default function clampCoords(coords: TCoords, radius: number, canvasWidth: number, canvasHeight: number): TCoords {
  return [
    clamp(coords[0], radius, canvasWidth - radius),
    clamp(coords[1], radius, canvasHeight - radius)
  ];
}
