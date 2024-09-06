import {
  Point,
  Segment,
  Path,
  Bbox,
  LineStandard,
  PathEdgeCenterPoints
} from '../../src';

export interface ITestPath {
  path: Path;
  perimeter: number; // pathPerimeter
  area: number; // pathArea
  midpoints: Point[]; // pathMidpointList
  segments: Segment[]; // pathSegmentList
  centroid: Point | null; // pathCentroid
  bbox: Bbox; // pathBbox
  ecp: PathEdgeCenterPoints | null;
  intersection: Array<{ // pathIntersectionWithSegment
    input: Segment;
    output: Point[];
    outputExtended: Point[];
  }>;
  slice: Array<{
    input: LineStandard[];
    output: Path[];
  }>;
}