import {
  TPoint,
  TPath
} from '../types';

import pointIsAlongPath from './point-is-along-path';
import pathSegmentList from './path-segment-list';

/**
 * 点是否在 path 围成的多边形内部
 *
 * 使用射线算法（Ray Casting Algorithm），从待判断的点向任意方向发出一条射线，计算这条射线与多边形边界的交点数量，
 * 若交点数为奇数，则该点位于多边形内部；如果为偶数，则位于外部。
 */
export default function pointIsWithinPath(point: TPoint, path: TPath): boolean {
  return path.length <= 2 || pointIsAlongPath(point, path) ? false : pathSegmentList(path).reduce((result, v) => {
    const [[xi, yi], [xj, yj]] = v;
    const intersect = ((yi > point[1]) !== (yj > point[1])) && (point[0] < (xj - xi) * (point[1] - yi) / (yj - yi) + xi);
    
    return intersect ? !result : result;
  }, false);
}