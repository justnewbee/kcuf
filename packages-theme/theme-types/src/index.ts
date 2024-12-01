/**
 * 大小，可用场景：按钮、弹窗等
 *
 * xs - 超小
 * s - 小
 * m - 中，一般用于默认值
 * l - 大
 * xl - 超大
 */
type TSize = 'xs' | 's' | 'm' | 'l' | 'xl';

/**
 * 方位设置，可用场景：Tooltip 等浮层
 *
 * t - top
 * tl - top-left
 * tr - top-right
 * b - bottom
 * bl - bottom-left
 * br - bottom-right
 * l - left
 * lt - left-top
 * lb - left-bottom
 * r - right
 * rt - right-top
 * rb - right-bottom
 */
type TPlacement = 't' | 'tl' | 'tr' | 'b' | 'bl' | 'br' | 'l' | 'lt' | 'lb' | 'r' | 'rt' | 'rb';

/**
 * 文字排列设置，可用场景：表格单元格、按钮等
 *
 * l - left
 * c - center
 * r - right
 */
type TAlign = 'l' | 'c' | 'r';

export type {
  TSize as Size,
  TPlacement as Placement,
  TAlign as Align
};
