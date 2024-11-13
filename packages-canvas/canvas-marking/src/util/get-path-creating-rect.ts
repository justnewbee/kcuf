import {
  Path,
  Point,
  pathRectByTwoPoints
} from '@kcuf/geometry-basic';

export default function getPathCreatingRect(path: Path, mouseCoords: Point): Path {
  const [p1] = path;
  
  return p1 ? pathRectByTwoPoints(p1, mouseCoords) : [mouseCoords];
}
