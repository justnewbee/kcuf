// 注意，Retina 下，浏览器缩放后，devicePixelRatio 可能不是 2
export const PIXEL_RATIO = window.devicePixelRatio > 1 ? Math.ceil(window.devicePixelRatio) : 1; // TODO only use it when drawing

/**
 * 密度模式下，「一片」区块的面积（平方像素）
 */
export const DENSITY_AREA = 500 * 500;

/**
 * 跟 speed 有关的设置，为了方便设置，设定为「每 100 帧」的变化量（约每 800ms 的变化量）
 */
export const SPEED_PER_FRAMES = 100;

export * from './defaults';