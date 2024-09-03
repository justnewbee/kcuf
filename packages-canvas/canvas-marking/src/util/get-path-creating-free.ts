import {
  Path,
  Point,
  pointIsEqual
} from '@kcuf/geometry-basic';

export default function getPathCreatingFree(path: Path, mouseCoords: Point): Path {
  const pFirst = path[0];
  const pLast = path[path.length - 1];
  
  if (!pFirst || !pLast) {
    return [mouseCoords];
  }
  
  return pointIsEqual(pFirst, mouseCoords) || pointIsEqual(pLast, mouseCoords) ? path : [...path, mouseCoords];
}