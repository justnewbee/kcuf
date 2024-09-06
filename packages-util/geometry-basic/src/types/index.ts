// 坐标 [x, y]
export type TPoint = [number, number];

// 向量 [vx, vy]
export type TVector = [number, number];

// 线段 [p1, p2]
export type TSegment = [TPoint, TPoint];

// 直线方程系数 `A*x + B*y + C = 0`
export type TLine = [number, number, number];

export type TLineStandard = [1, 0, number] | [number, -1, number];

/**
 * 路径，一组有序坐标，也可以表示多边形（Polygon），当表示多边形的时候，
 * 至少需要三个点，且第一个点和最末一个点自动闭合（几个点表示几边型）
 */
export type TPath = TPoint[];

export type TBbox = [TPoint, TPoint];

export type TMagnetPointResult = [TPoint, number] | null;

export interface IPathEdgeCenterPoints {
  t: TPoint;
  r: TPoint;
  b: TPoint;
  l: TPoint;
  c: TPoint;
}