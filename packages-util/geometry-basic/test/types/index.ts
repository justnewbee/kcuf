import {
  Point,
  Segment,
  Path,
  Bbox,
  LineNormalized,
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
  intersectionWithLine?: Array<{ // intersectionLineWithPath
    title: string;
    input: LineNormalized;
    output: Point[];
  }>;
  intersectionWithSegment?: Array<{ // intersectionSegmentWithPath
    title: string;
    input: Segment;
    output: Point[];
    outputExtended: Point[];
  }>;
}