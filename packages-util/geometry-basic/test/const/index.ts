import {
  Point,
  Segment,
  Path,
  Bbox
} from '../../src';

interface IPathInfo {
  path: Path;
  perimeter: number;
  area: number;
  midpoints: Point[];
  segments: Segment[];
  centroid: Point | null;
  bbox: Bbox;
}

export const PATH_INFO_0: IPathInfo = {
  path: [],
  perimeter: 0,
  area: 0,
  midpoints: [],
  segments: [],
  centroid: null,
  bbox: [[0, 0], [0, 0]]
};

export const PATH_INFO_1: IPathInfo = {
  path: [[1, 2]],
  perimeter: 0,
  area: 0,
  midpoints: [],
  segments: [],
  centroid: [1, 2],
  bbox: [[1, 2], [1, 2]]
};

export const PATH_INFO_2: IPathInfo = {
  path: [[1, 5], [2, 3]],
  perimeter: Math.hypot(1, 2),
  area: 0,
  midpoints: [[1.5, 4]],
  segments: [[[1, 5], [2, 3]]],
  centroid: [1.5, 4],
  bbox: [[1, 3], [2, 5]]
};

/**
 * 等腰直角三角形
 *
 * 5 |
 * 4 ◉ (0, 4)
 * 3 ↓   \
 * 2 |       \
 * 1 |          ↖
 * 0 ◉→ +--+--+--◉--+
 *   0  1  2  3  4  5
 */
export const PATH_INFO_TRIANGLE: IPathInfo = {
  path: [[0, 0], [4, 0], [0, 4]],
  perimeter: 8 + Math.hypot(4, 4),
  area: 8,
  midpoints: [[2, 0], [2, 2], [0, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]]
};

/**
 * 正方形
 *
 * 5 |
 * 4 ◉--------- ←◉ (4, 4)
 * 3 ↓           |
 * 2 |           |
 * 1 |           ↑
 * 0 ◉→ +--+--+--◉--+-
 *   0  1  2  3  4  5
 */
export const PATH_INFO_SQUARE: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 4], [0, 4]],
  perimeter: 16,
  area: 16,
  midpoints: [[2, 0], [4, 2], [2, 4], [0, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [0, 4]], [[0, 4], [0, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]]
};

/**
 * 矩形
 *
 * 3 |
 * 2 ◉--------- ←◉ (4, 2)
 * 1 ↓           ↑
 * 0 ◉→ +--+--+--◉--+-
 *   0  1  2  3  4  5
 */
export const PATH_INFO_RECTANGLE: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 2], [0, 2]],
  perimeter: 12,
  area: 8,
  midpoints: [[2, 0], [4, 1], [2, 2], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [0, 2]], [[0, 2], [0, 0]]],
  centroid: [2, 1],
  bbox: [[0, 0], [4, 2]]
};

/**
 * 凸多边形（形如房子）
 *
 * 5 |
 * 4 |     ◉ (2, 4)
 * 3 | ↙       ↖
 * 2 ◉           ◉
 * 1 ↓           ↑
 * 0 ◉→ +--+--+--◉--+-
 *   0  1  2  3  4  5
 */
export const PATH_INFO_CONVEX: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 2], [2, 4], [0, 2]],
  perimeter: 8 + 2 * Math.hypot(2, 2),
  area: 12,
  midpoints: [[2, 0], [4, 1], [3, 3], [1, 3], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]]
};

/**
 * 凹多边形（形如车头）
 *
 * 5 |
 * 4 |     ◉    ←◉
 * 3 |     ↓     |
 * 2 ◉--- ←◉     |
 * 1 ↓           ↑
 * 0 ◉→ +--+--+--◉--+-
 *   0  1  2  3  4  5
 */
export const PATH_INFO_CONCAVE: IPathInfo = {
  path: [[0, 0], [4, 0], [4, 4], [2, 4], [2, 2], [0, 2]],
  perimeter: 16,
  area: 12,
  midpoints: [[2, 0], [4, 2], [3, 4], [2, 3], [1, 2], [0, 1]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [2, 4]], [[2, 4], [2, 2]], [[2, 2], [0, 2]], [[0, 2], [0, 0]]],
  centroid: null, // TODO
  bbox: [[0, 0], [4, 4]]
};

/**
 * 凹多边形（形如车头）
 *
 * 5 |
 * 4 ◉→          ◉
 * 3 |  ↖     ↙
 * 2 |     +
 * 1 |  ↙      ↖
 * 0 ◉→ +--+--+--◉--+-
 *   0  1  2  3  4  5
 */
export const PATH_INFO_CROSSING: IPathInfo = {
  path: [[0, 0], [4, 0], [0, 4], [4, 4]],
  perimeter: 8 + 2 * Math.hypot(4, 4),
  area: 8,
  midpoints: [[2, 0], [2, 2], [2, 4], [2, 2]],
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [4, 4]], [[4, 4], [0, 0]]],
  centroid: [2, 2],
  bbox: [[0, 0], [4, 4]]
};
