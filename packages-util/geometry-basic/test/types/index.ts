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
  intersectionWithLineCases?: Record<string, { // pathIntersectionWithLine key 将作为 test title
    input: LineStandard;
    output: Point[];
  }>;
  intersectionWithSegment?: Array<{ // pathIntersectionWithSegment TODO 改 map
    input: Segment;
    output: Point[];
    outputExtended: Point[];
  }>;
  splitByLineCases?: Record<string, {
    input: LineStandard;
    output: [Path, Path];
  }>;
  splitByLines?: Array<{
    input: LineStandard[];
    output: Path[];
  }>;
}