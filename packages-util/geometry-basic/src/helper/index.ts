// 通用
export { default as roundCoords } from './round-coords';
export { default as fromDegreesToRadians } from './from-degrees-to-radians';
export { default as fromRadiansToDegrees } from './from-radians-to-degrees';

// 点
export { default as pointIsEqual } from './point-is-equal';
export { default as pointIsWithinPath } from './point-is-within-path';
export { default as pointIsAlongPath } from './point-is-along-path';
export { default as pointToPointDistance } from './point-to-point-distance';
export { default as getSnappingPoint } from './get-snapping-point';
export { default as getSnappingPointBetween } from './get-snapping-point-between';

// 点与线
export { default as pointToSegmentDistances } from './point-to-segment-distances';
export { default as pointToSegmentDistance } from './point-to-segment-distance';
export { default as pointIsInSegmentProjection } from './point-is-in-segment-projection';
export { default as pointIsAlongSegment } from './point-is-along-segment';
export { default as getVerticalIntersectionPoint } from './get-vertical-intersection-point';

// 点与路径
export { default as getMagnetPointAlongPath } from './get-magnet-point-along-path';
export { default as getMagnetPointAlongPaths } from './get-magnet-point-along-paths';
export { default as getPointSiblingsFromPath } from './get-point-siblings-from-path';

// 线段
export { default as segmentIsEqual } from './segment-is-equal';
export { default as segmentVector } from './segment-vector';
export { default as segmentLength } from './segment-length';
export { default as segmentMidpoint } from './segment-midpoint';
export { default as segmentSlope } from './segment-slope';
export { default as segmentLineCoefficients } from './segment-line-coefficients';
export { default as segmentProjectionX } from './segment-projection-x';
export { default as segmentProjectionY } from './segment-projection-y';
export { default as segmentIntersectionPoint } from './segment-intersection-point';

// 路径
export { default as pathTotalLength } from './path-total-length';
export { default as pathCentroid } from './path-centroid';
export { default as pathArea } from './path-area';
export { default as pathSegmentList } from './path-segment-list';
export { default as pathMidpointList } from './path-midpoint-list';
export { default as pathBbox } from './path-bbox';

export { default as getRectPathBySegmentAndPoint } from './get-rect-path-by-segment-and-point';
export { default as getRectPathByTwoPoints } from './get-rect-path-by-two-points';
export { default as getPathEdgeAndCenterPoints } from './get-path-edge-and-center-points';

// 面
export { default as checkInPathPointDuplicate } from './check-in-path-point-duplicate';
export { default as checkInPathPointOverlappingSegment } from './check-in-path-point-overlapping-segment';
export { default as checkInPathSegmentCrossing } from './check-in-path-segment-crossing';

// 线与线
export { default as isSegmentProjectionOverlap } from './is-segment-projection-overlap';
export { default as isSegmentCrossing } from './segment-is-crossing';

// 线与路径
export { default as getSegmentInnerSliceListByPath } from './get-segment-inner-slice-list-by-path';
export { default as getSegmentInnerSliceTotalLengthByPath } from './get-segment-inner-slice-total-length-by-path';

// 路径与路径
export { default as getAuxiliarySegmentList } from './get-auxiliary-segment-list';

// 角 - 返回弧度，角的正负按数学规范
export { default as getAngleBetweenSegments } from './get-angle-between-segments';
export { default as getAngleBetweenSegmentAndAxisX } from './get-angle-between-segment-and-axis-x';
export { default as getAngleBetweenSegmentAndAxisY } from './get-angle-between-segment-and-axis-y';