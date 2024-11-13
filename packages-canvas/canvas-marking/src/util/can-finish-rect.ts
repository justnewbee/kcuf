import {
  Path,
  segmentLength
} from '@kcuf/geometry-basic';

export default function canFinishRect(path: Path, imageScale: number): boolean {
  const [p1, p2, p3] = path;
  
  if (!p1 || !p2 || !p3) {
    return false;
  }
  
  return segmentLength([p1, p2]) > 4 / imageScale && segmentLength([p2, p3]) > 4 / imageScale;
}
