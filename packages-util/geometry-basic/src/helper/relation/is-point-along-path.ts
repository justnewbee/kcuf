import {
  TPoint,
  TPath
} from '../../types';
import {
  pathSegmentList
} from '../base';

import isPointAlongSegment from './is-point-along-segment';

/**
 * 点是否在路径上
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
export default function isPointAlongPath(point: TPoint, path: TPath, open?: boolean): boolean {
  return pathSegmentList(path, open).some(v => isPointAlongSegment(point, v), false);
}