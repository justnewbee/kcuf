import {
  Path,
  Segment
} from '../../src';

interface IPathInfo {
  path: Path;
  segments: Segment[];
  perimeter: number;
}

export const PATH_INFO_0: IPathInfo = {
  path: [],
  segments: [],
  perimeter: 0
};

export const PATH_INFO_1: IPathInfo = {
  path: [[1, 2]],
  segments: [],
  perimeter: 0
};

export const PATH_INFO_2: IPathInfo = {
  path: [[1, 2], [2, 5]],
  segments: [[[1, 2], [2, 5]]],
  perimeter: Math.hypot(1, 3)
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
  segments: [[[0, 0], [4, 0]], [[4, 0], [0, 4]], [[0, 4], [0, 0]]],
  perimeter: 8 + Math.hypot(4, 4)
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
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [0, 4]], [[0, 4], [0, 0]]],
  perimeter: 16
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
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [0, 2]], [[0, 2], [0, 0]]],
  perimeter: 12
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
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 2]], [[4, 2], [2, 4]], [[2, 4], [0, 2]], [[0, 2], [0, 0]]],
  perimeter: 8 + 2 * Math.hypot(2, 2)
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
  segments: [[[0, 0], [4, 0]], [[4, 0], [4, 4]], [[4, 4], [2, 4]], [[2, 4], [2, 2]], [[2, 2], [0, 2]], [[0, 2], [0, 0]]],
  perimeter: 16
};
