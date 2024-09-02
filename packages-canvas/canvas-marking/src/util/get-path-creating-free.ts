import {
  Path,
  Point,
  isPointEqual
} from '@kcuf/geometry-basic';

export default function getPathCreatingFree(path: Path, mouseCoords: Point): Path {
  const pFirst = path[0];
  const pLast = path[path.length - 1];
  
  if (!pFirst || !pLast) {
    return [mouseCoords];
  }
  
  return isPointEqual(pFirst, mouseCoords) || isPointEqual(pLast, mouseCoords) ? path : [...path, mouseCoords];
}