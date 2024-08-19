export { default as roundCoords } from './round-coords';

// 点与点
export { default as isPointEqual } from './is-point-equal';

// 点与线
export { default as isPointInSegmentProjection } from './is-point-in-segment-projection';
export { default as isPointOnSegment } from './is-point-on-segment';
export { default as getPointDistancesToSegment } from './get-point-distances-to-segment';
export { default as getVerticalIntersectionPoint } from './get-vertical-intersection-point';

// 点与路径
export { default as getMagnetPointAlongPath } from './get-magnet-point-along-path';
export { default as getMagnetPointAlongPaths } from './get-magnet-point-along-paths';

// 点与面
export { default as isPointInsidePolygon } from './is-point-inside-polygon';
export { default as isPointOnPolygonBorder } from './is-point-on-polygon-border';

// 线
export { default as getSegmentProjectionX } from './get-segment-projection-x';
export { default as getSegmentProjectionY } from './get-segment-projection-y';
export { default as getSegmentVector } from './get-segment-vector';
export { default as getSegmentSlope } from './get-segment-slope';
export { default as getSegmentLength } from './get-segment-length';
export { default as getSegmentEquationFactors } from './get-segment-equation-factors';

// 路径
export { default as getPathLength } from './get-path-length';
export { default as getRectPathBySegmentAndPoint } from './get-rect-path-by-segment-and-point';
export { default as getRectPathByTwoPoints } from './get-rect-path-by-two-points';

// 面
export { default as getPathArea } from './get-path-area';
export { default as getPathBoundaryRect } from './get-path-boundary-rect';
export { default as getPathMiddlePointList } from './get-path-middle-point-list';
export { default as getSegmentList } from './get-segment-list';
export { default as checkInPathPointDuplicate } from './check-in-path-point-duplicate';
export { default as checkInPathPointOverlappingSegment } from './check-in-path-point-overlapping-segment';
export { default as checkInPathSegmentCrossing } from './check-in-path-segment-crossing';

// 线与线
export { default as getSegmentInsidePolygonLength } from './get-segment-inside-polygon-length';
export { default as isSegmentProjectionOverlap } from './is-segment-projection-overlap';
export { default as isSegmentCrossing } from './is-segment-crossing';