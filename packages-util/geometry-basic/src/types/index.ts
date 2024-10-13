import {
  EJustifyMagnetOrder
} from '../enum';

/**
 * 向量 [vx, vy]
 */
export type TVector = [number, number];

/**
 * 坐标 [x, y]
 */
export type TPoint = [number, number];

/**
 * 线段 [p1, p2]
 */
export type TSegment = [TPoint, TPoint];

// /**
//  * 射线
//  */
// export interface IRay {
//   point: TPoint;
//   norm: TVector; // 单位向量
// }

/**
 * 直线一般式表示 `Ax + By + C = 0`，A B 不同时为 0
 */
export type TLine = [number, number, number];

export type TLineNormalized = [1, 0, number] | [number, -1, number];

/**
 * 角 ∠ABC
 */
export type TAngle = [TPoint, TPoint, TPoint];

/**
 * 路径，一组有序坐标，也可以表示多边形（Polygon），当表示多边形的时候，
 * 至少需要三个点，且第一个点和最末一个点自动闭合（几个点表示几边型）
 */
export type TPath = TPoint[];

export type TBbox = [TPoint, TPoint];

export interface IPathEdgeCenterPoints {
  t: TPoint;
  r: TPoint;
  b: TPoint;
  l: TPoint;
  c: TPoint;
}

export interface IJustifyMagnetResult {
  point: TPoint;
  distance: number;
  order: EJustifyMagnetOrder;
}

export interface IJustifyPerpendicularResult {
  point: TPoint;
  theta: number; // 度数
  distance: number;
}

export interface IJustifyPerpendicularThreshold {
  /**
   * 角度变化不可超过此值（默认 5° 以内）
   */
  angle?: number;
  /**
   * 距离变化不可超过此值，默认 0，不比较（因跟图片比例有关系，必须要传入）
   */
  radius?: number;
}

export interface IPathIntersectionWithSegmentOptions {
  extended?: boolean;
  sorted?: boolean;
}
