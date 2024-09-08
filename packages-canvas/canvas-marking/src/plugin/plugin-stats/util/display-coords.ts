import {
  Point,
  roundCoords
} from '@kcuf/geometry-basic';

export default function displayCoords(point: Point | null): string {
  if (!point) {
    return 'null';
  }
  
  const [x, y] = roundCoords(point, 1);
  
  return `(${x}, ${y})`;
}