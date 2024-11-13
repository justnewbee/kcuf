import {
  Point
} from '@kcuf/geometry-basic';

import displayCoords from './display-coords';

export default function displayCoordsAndIndex(point: Point | null, index: number): string {
  return `${displayCoords(point)} / ${index}`;
}
