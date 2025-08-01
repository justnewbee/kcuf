import {
  Point,
  Segment,
  Path,
  Bbox,
  PathEdgeCenterPoints
} from '../../src';

export interface ITestPath {
  title: string;
  path: Path;
  perimeter: number; // pathPerimeter
  area: number; // pathArea
  midpoints: Point[]; // pathMidpointList
  segments: Segment[]; // pathSegmentList
  centroid: Point | null; // pathCentroid
  bbox: Bbox; // pathBbox
  ecp: PathEdgeCenterPoints | null;
}
