// 坐标 [x, y]
export type TPoint = [number, number];

// 向量 [vx, vy]
export type TVector = [number, number];

// 线段 [p1, p2]
export type TSegment = [TPoint, TPoint];

/**
 * 路径，一组有序坐标，也可以表示多边形（Polygon），当表示多边形的时候，
 * 至少需要三个点，且第一个点和最末一个点自动闭合（几个点表示几边型）
 */
export type TPath = TPoint[];

export type TMagnetPointResult = [TPoint, number] | null;