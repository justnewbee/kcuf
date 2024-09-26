import {
  Path,
  Point,
  pathRectByTwoPoints,
  isNearlyEqual
} from '@kcuf/geometry-basic';

export default function getPathCreatingRect(path: Path, mouseCoords: Point): Path {
  const [p1] = path;
  
  if (!p1) {
    return [mouseCoords];
  }
  
  if (isNearlyEqual(p1[0], mouseCoords[0]) || isNearlyEqual(p1[1], mouseCoords[1])) {
    return [p1, mouseCoords];
  }
  
  return pathRectByTwoPoints(p1, mouseCoords);
}