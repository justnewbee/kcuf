import {
  TPoint,
  TPath
} from '../types';

import getSegmentList from './get-segment-list';
import isPointOnSegment from './is-point-on-segment';

/**
 * 判断点是否在多边形边框上
 * 
 * 等效于 canvas 的 `isPointInStroke` API https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke
 * 
 * 但 `isPointInStroke` 有以下问题：
 *
 * 1. 需要「空画」一次，即 beginPath、moveTo、endPath 等一样不能少，但又不能画出来
 *    - 可能造成不必要的性能负担
 *    - 对 canvas context 产生依赖
 * 2. 开发时的热加载导致有可能导致报错「Argument 1 is not a finite floating-point value.」
 */
export default function isPointOnPolygonBorder(point: TPoint, polygon: TPath): boolean {
  return getSegmentList(polygon).some(v => {
    return isPointOnSegment(point, v);
  }, false);
}