import {
  Point,
  Segment,
  Path,
  Bbox,
  PathEdgeCenterPoints,
  roundCoords
} from '../../src';

interface IPathInfo {
  path: Path;
  perimeter: number;
  area: number;
  midpoints: Point[];
  segments: Segment[];
  centroid: Point | null;
  bbox: Bbox;
  ecp: PathEdgeCenterPoints | null;
}

const SQRT2 = Math.sqrt(2);
const SQRT3 = Math.sqrt(3);

export const PATH_INFO_0: IPathInfo = {
  path: [],
  perimeter: 0,
  area: 0,
  midpoints: [],
  segments: [],
  centroid: null,
  bbox: [[0, 0], [0, 0]],
  ecp: null
};

/**
 * 一个点
 *
 *   0  1  2  3  4  5
 * 0 +--+--+--+--+--+
 * 1 |
 * 2 |  ⦿ (1, 2)
 * 3 |
 */
export const PATH_INFO_1: IPathInfo = {
  path: [[1, 2]],
  perimeter: 0,
  area: 0,
  midpoints: [],
  segments: [],
  centroid: [1, 2],
  bbox: [[1, 2], [1, 2]],
  ecp: {
    t: [1, 2],
    r: [1, 2],
    b: [1, 2],
    l: [1, 2],
    c: [1, 2]
  }
};

/**
 * 线段
 *
 *  0  1  2  3  4  5
 * 0 +--+--+--+--+--+
 * 1 |
 * 2 |
 * 3 |     ◉ (2, 3)
 * 4 |   ↗
 * 5 |  ⦿ (1, 5)
 */
export const PATH_INFO_2: IPathInfo = {
  path: [[1, 5], [2, 3]],
  perimeter: Math.hypot(1, 2),
  area: 0,
  midpoints: [[1.5, 4]],
  segments: [[[1, 5], [2, 3]]],
  centroid: [1.5, 4],
  bbox: [[1, 3], [2, 5]],
  ecp: {
    t: [2, 3],
    r: [2, 3],
    b: [1, 5],
    l: [1, 5],
    c: [1.5, 4]
  }
};

/**
 * 正三角形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+
 * 1 | \        ↙
 * 2 |   ↖   /
 * 3 |     ◉ (2, 2√3)
 * 4 |
 */
export const PATH_INFO_3_REGULAR: IPathInfo = {
  path: [[0, 0], [4, 0], [2, 2 * SQRT3]],
  perimeter: 12,
  area: 4 * SQRT3,
  midpoints: [[2, 0], [3, SQRT3], [1, SQRT3]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [2, 2 * SQRT3]], [[2, 2 * SQRT3], [0, 0]]],
  centroid: roundCoords([2, 2 * SQRT3 / 3]),
  bbox: [[0, 0], [4, 2 * SQRT3]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [2, 2 * SQRT3],
    l: [0, 0],
    c: roundCoords([2, SQRT3])
  }
};

/**
 * 等腰直角三角形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+
 * 1 |          ↙
 * 2 |      /
 * 3 ↑   /
 * 4 ◉ (0, 4)
 * 5 |
 */
export const PATH_INFO_3_ISOSCELES_RIGHT: IPathInfo = {
  path: [[0, 0], [4, 0], [0, 4]],
  perimeter: 8 + 4 * SQRT2,
  area: 8,
  midpoints: [[2, 0], [2, 2], [0, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [0, 4],
    l: [0, 0],
    c: [2, 2]
  }
};

/**
 * 矩形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 ↑           ↓
 * 2 ◉--------- ←◉ (4, 2)
 * 3 |
 */
export const PATH_INFO_4_RECTANGLE: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 2], [0, 2]],
  perimeter: 12,
  area: 8,
  midpoints: [[2, 0], [4, 1], [2, 2], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [0, 2]], [[0, 2], [0, 0]]],
  centroid: [2, 1],
  bbox: [[0, 0], [4, 2]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [4, 2],
    l: [0, 0],
    c: [2, 1]
  }
};

/**
 * 正方形
 *
 *  0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 |           ↓
 * 2 |           |
 * 3 ↑           |
 * 4 ◉--------- ←◉ (4, 4)
 * 5 |
 */
export const PATH_INFO_4_SQUARE: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 4], [0, 4]],
  perimeter: 16,
  area: 16,
  midpoints: [[2, 0], [4, 2], [2, 4], [0, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [0, 4]], [[0, 4], [0, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [4, 4],
    l: [0, 0],
    c: [2, 2]
  }
};

/**
 * 菱形
 *
 *  0  1  2  3  4  5
 * 0 +--+--⦿--+--+--+-
 * 1 |  ↗     ↘
 * 2 ◉           ◉
 * 3 |  ↖      ↙
 * 4 |     ◉ (2, 4)
 * 5 |
 */
export const PATH_INFO_4_DIAMOND: IPathInfo = {
  path: [[2, 0], [4, 2], [2, 4], [0, 2]],
  perimeter: 8 * SQRT2,
  area: 8,
  midpoints: [[3, SQRT2], [3, 3 * SQRT2], [2, 3 * SQRT2], [1, SQRT2]],
  segments: [[[2, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [2, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [2, 0],
    r: [4, 2],
    b: [2, 4],
    l: [0, 2],
    c: [2, 2]
  }
};

/**
 * 交叉图形
 *
 *   0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 |  ↖      ↙
 * 2 |     +
 * 3 |  ↙     ↖
 * 4 ◉→ ---------◉
 * 5 |
 */
export const PATH_INFO_4_CROSSING: IPathInfo = {
  path: [[0, 0], [4, 0], [0, 4], [4, 4]],
  perimeter: 8 + 8 * SQRT2,
  area: 8,
  midpoints: [[2, 0], [2, 2], [2, 4], [2, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [4, 4]], [[4, 4], [0, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [0, 4],
    l: [0, 0],
    c: [2, 2]
  }
};

/**
 * 凸多边形（形如房子）
 *
 *   0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 ↑           ↓
 * 2 ◉           ◉
 * 3 | ↖       ↙
 * 4 |     ◉ (2, 4)
 * 5 |
 */
export const PATH_INFO_5_CONVEX: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 2], [2, 4], [0, 2]],
  perimeter: 8 + 4 * SQRT2,
  area: 12,
  midpoints: [[2, 0], [4, 1], [3, 3], [1, 3], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [2, 4],
    l: [0, 0],
    c: [2, 2]
  }
};

/**
 * 凹多边形（形如车头）
 *
 *   0  1  2  3  4  5
 * 0 ⦿→ +--+--+--◉--+-
 * 1 ↑           ↓
 * 2 ◉--- ←◉     |
 * 3 |     ↑     |
 * 4 |     ◉--- ←◉
 * 5 |
 */
export const PATH_INFO_6_CONCAVE: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 4], [2, 4], [2, 2], [0, 2]],
  perimeter: 16,
  area: 12,
  midpoints: [[2, 0], [4, 2], [3, 4], [2, 3], [1, 2], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [2, 4]], [[2, 4], [2, 2]], [[2, 2], [0, 2]], [[0, 2], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]],
  ecp: {
    t: [0, 0],
    r: [4, 0],
    b: [4, 4],
    l: [0, 0],
    c: [2, 2]
  }
};

