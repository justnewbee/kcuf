import {
  Path,
  Point,
  pointDistanceToSegment,
  pathRectBySegmentAndPoint
} from '@kcuf/geometry-basic';

export default function getPathCreatingRect2(path: Path, mouseCoords: Point, limit: [Point, Point]): Path {
  const [p1, p2] = path;
  
  if (!p1 || !p2) {
    return [...path, mouseCoords];
  }
  
  if (pointDistanceToSegment(mouseCoords, [p1, p2]) < 4) {
    return [p1, p2];
  }
  
  return pathRectBySegmentAndPoint([p1, p2], mouseCoords, limit) || [p1, p2];
}
