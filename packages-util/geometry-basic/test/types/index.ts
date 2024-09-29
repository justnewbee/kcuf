import {
  Point,
  Segment,
  Path,
  Bbox,
  LineStandard,
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
  intersectionWithLine?: Array<{ // pathIntersectionWithLine
    title: string;
    input: LineStandard;
    output: Point[];
  }>;
  intersectionWithSegment?: Array<{ // pathIntersectionWithSegment
    title: string;
    input: Segment;
    output: Point[];
    outputExtended: Point[];
  }>;
  spliceByLine?: Array<{ // pathSliceByLine
    title: string;
    input: LineStandard;
    output: [Path, Path] | null;
  }>;
  spliceByLines?: Array<{
    title: string;
    input: LineStandard[];
    output: Path[];
  }>;
}