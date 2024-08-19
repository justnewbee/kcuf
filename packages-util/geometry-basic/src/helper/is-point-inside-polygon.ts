import {
  TPoint,
  TPath
} from '../types';

import getSegmentList from './get-segment-list';

/**
 * 判断点是否在多边形内部，射线算法（Ray Casting Algorithm），从待判断的点向任意方向发出一条射线，计算这条射线与多边形边界的交点数量，
 * 若交点数为奇数，则该点位于多边形内部；如果为偶数，则位于外部。
 * 
 * 等效于 canvas 的 `isPointInPath` API https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
 * 
 * 但 `isPointInPath` 有以下问题：
 * 
 * 1. 需要「空画」一次，即 beginPath、moveTo、endPath 等一样不能少，但又不能画出来
 *    - 可能造成不必要的性能负担
 *    - 对 canvas context 产生依赖
 */
export default function isPointInsidePolygon(point: TPoint, polygon: TPath): boolean {
  return polygon.length <= 2 ? false : getSegmentList(polygon).reduce((result, v) => {
    const [[xi, yi], [xj, yj]] = v;
    const intersect = ((yi > point[1]) !== (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    
    return intersect ? !result : result;
  }, false);
}