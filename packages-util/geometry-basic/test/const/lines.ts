import {
  LineNormalized
} from '../../src';

/**
 * 直线方程说明：[N][A]X_[N][B]Y_[N][C]
 *
 * - N 负（Negative）
 * - A X 系数
 * - B Y 系数，只取 0 或 -1，即只能是 N1Y 或 0Y
 * - C 常数
 */
// 水平 y = n
export const LINE_0X_N1Y_N1: LineNormalized = [0, -1, -1]; // y = -1
export const LINE_0X_N1Y_0: LineNormalized = [0, -1, 0]; // y = 0
export const LINE_0X_N1Y_1: LineNormalized = [0, -1, 1]; // y = 1
export const LINE_0X_N1Y_2: LineNormalized = [0, -1, 2]; // y = 2
export const LINE_0X_N1Y_3: LineNormalized = [0, -1, 3]; // y = 3
export const LINE_0X_N1Y_4: LineNormalized = [0, -1, 4]; // y = 4
export const LINE_0X_N1Y_5: LineNormalized = [0, -1, 5]; // y = 5
// 正斜 y = +nx
export const LINE_1X_N1Y_N1: LineNormalized = [1, -1, -1]; // y = x - 1
export const LINE_1X_N1Y_0: LineNormalized = [1, -1, 0]; // y = x
export const LINE_1X_N1Y_1: LineNormalized = [1, -1, 1]; // y = x + 1
export const LINE_1X_N1Y_2: LineNormalized = [1, -1, 2]; // y = x + 2
export const LINE_1X_N1Y_3: LineNormalized = [1, -1, 3]; // y = x + 3
export const LINE_1X_N1Y_4: LineNormalized = [1, -1, 4]; // y = x + 4
export const LINE_1X_N1Y_5: LineNormalized = [1, -1, 5]; // y = x + 5
// 垂直 x = n
export const LINE_1X_0Y_N5: LineNormalized = [1, 0, -5]; // x = 5
export const LINE_1X_0Y_N4: LineNormalized = [1, 0, -4]; // x = 4
export const LINE_1X_0Y_N3: LineNormalized = [1, 0, -3]; // x = 3
export const LINE_1X_0Y_N2: LineNormalized = [1, 0, -2]; // x = 2
export const LINE_1X_0Y_N1: LineNormalized = [1, 0, -1]; // x = 1
export const LINE_1X_0Y_0: LineNormalized = [1, 0, 0]; // x = 0
export const LINE_1X_0Y_1: LineNormalized = [1, 0, 1]; // x = -1
// 反斜 y = -nx
export const LINE_N1X_N1Y_N1: LineNormalized = [-1, -1, -1]; // y = -x - 1
export const LINE_N1X_N1Y_0: LineNormalized = [-1, -1, 0]; // y = -x
export const LINE_N1X_N1Y_1: LineNormalized = [-1, -1, 1]; // y = -x + 1
export const LINE_N1X_N1Y_2: LineNormalized = [-1, -1, 2]; // y = -x + 2
export const LINE_N1X_N1Y_3: LineNormalized = [-1, -1, 3]; // y = -x + 3
export const LINE_N1X_N1Y_4: LineNormalized = [-1, -1, 4]; // y = -x + 4
export const LINE_N1X_N1Y_5: LineNormalized = [-1, -1, 5]; // y = -x + 5