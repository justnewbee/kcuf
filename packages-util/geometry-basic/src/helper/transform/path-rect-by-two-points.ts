import {
  TPoint
} from '../../types';

/**
 * 以给定对角线（不论水平或垂直），求矩形的四个点
 */
export default function pathRectByTwoPoints(p1: TPoint, p2: TPoint): [TPoint, TPoint, TPoint, TPoint] {
  return [
    p1,
    [p1[0], p2[1]],
    p2,
    [p2[0], p1[1]]
  ];
}
