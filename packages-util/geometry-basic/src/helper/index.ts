/* ========================== *
 * 点
 * ========================== */
// 点 vs 点（或点们）
export { default as pointIsEqual } from './point-is-equal';
export { default as pointIsIncluded } from './point-is-included';
export { default as pointDistance } from './point-distance';
export { default as pointRotateAroundPoint } from './point-rotate-around-point';
// 点 vs 线段
export { default as pointIsAlongSegment } from './point-is-along-segment';
export { default as pointIsInSegmentProjection } from './point-is-in-segment-projection';
export { default as pointDistanceToSegment } from './point-distance-to-segment';
export { default as pointDistanceToSegmentDetailed } from './point-distance-to-segment-detailed';
// 点 vs 路径
export { default as pointIsWithinPath } from './point-is-within-path';
export { default as pointIsAlongPath } from './point-is-along-path';
export { default as pointSiblingsFromPath } from './point-siblings-from-path';
export { default as pointJustifyMagnetAlongPath } from './point-justify-magnet-along-path';
export { default as pointJustifyMagnetAlongPaths } from './point-justify-magnet-along-paths';
export { default as pointJustifyRightAngle } from './point-justify-right-angle';
// TODO
export { default as pointSnapAroundPoint } from './point-snap-around-point';
export { default as pointSnapAroundPointBetween } from './point-snap-around-point-between';
export { default as getVerticalIntersectionPoint } from './get-vertical-intersection-point';

/* ========================== *
 * 直线
 * ========================== */
export { default as lineIntersection } from './line-intersection';

/* ========================== *
 * 线段
 * ========================== */
// 线段自身
export { default as segmentVector } from './segment-vector';
export { default as segmentLength } from './segment-length';
export { default as segmentMidpoint } from './segment-midpoint';
export { default as segmentSlope } from './segment-slope';
export { default as segmentProjectionX } from './segment-projection-x';
export { default as segmentProjectionY } from './segment-projection-y';
// 线段 vs 线段
export { default as segmentIntersection } from './segment-intersection';
export { default as segmentIsEqual } from './segment-is-equal';
export { default as segmentIsEqualSlope } from './segment-is-equal-slope';
export { default as segmentIsCrossing } from './segment-is-crossing';
export { default as segmentProjectionOverlap } from './segment-projection-overlap';
// 线段 vs 直线
export { default as segmentToLine } from './segment-to-line';
export { default as segmentIntersectionWithLine } from './segment-intersection-with-line';
// 线段 vs 路径
export { default as segmentInnerSliceListByPath } from './segment-inner-slice-list-by-path';
export { default as segmentInnerSliceTotalLengthByPath } from './segment-inner-slice-total-length-by-path';

/* ========================== *
 * 路径（多边形）
 * ========================== */
// 路径自身
export { default as pathPerimeter } from './path-perimeter';
export { default as pathCentroid } from './path-centroid';
export { default as pathArea } from './path-area';
export { default as pathBbox } from './path-bbox';
export { default as pathEdgeCenterPoints } from './path-edge-center-points';
export { default as pathHasSegmentCrossing } from './path-has-segment-crossing';
export { default as pathSegmentList } from './path-segment-list';
export { default as pathMidpointList } from './path-midpoint-list';
export { default as pathRectBySegmentAndPoint } from './path-rect-by-segment-and-point';
export { default as pathRectByTwoPoints } from './path-rect-by-two-points';
// 路径 vs 线段
export { default as pathIntersectionWithSegment } from './path-intersection-with-segment';
// 路径 vs 直线
export { default as pathIntersectionWithLine } from './path-intersection-with-line';
export { default as pathSplitByLine } from './path-split-by-line';
export { default as pathSplitByLines } from './path-split-by-lines';
// TODO
export { default as checkInPathPointDuplicate } from './check-in-path-point-duplicate';
export { default as getAuxiliarySegmentList } from './get-auxiliary-segment-list';

// 角 - 返回弧度，角的正负按数学规范
export { default as angleFromSegmentToSegment } from './angle-from-segment-to-segment';
export { default as angleBetweenSegments } from './angle-between-segments';
export { default as angleBetweenSegmentAndAxisX } from './angle-between-segment-and-axis-x';
export { default as angleBetweenSegmentAndAxisY } from './angle-between-segment-and-axis-y';