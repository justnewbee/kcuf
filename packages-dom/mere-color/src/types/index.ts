interface IWithAlpha {
  a?: number; // 0-100
}

/**
 * Normalized hsl modern format
 */
export type THslString = `hsl(${number} ${number}% ${number}%)` | `hsl(${number} ${number}% ${number}% / ${number}%)`;

/**
 * Normalized rgb modern format
 */
export type TRgbString = `rgb(${number} ${number} ${number})` | `hsl(${number} ${number} ${number} / ${number}%)`;

export interface IRgb extends IWithAlpha {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface IHsl extends IWithAlpha {
  h: number; // 0-359
  s: number; // 0-100
  l: number; // 0-100
}

export interface IHsv extends IWithAlpha {
  h: number; // 0-359
  s: number; // 0-100
  v: number; // 0-100
}

export interface IHwb extends IWithAlpha {
  h: number;
  w: number;
  b: number;
}

export interface IContrastScores {
  contrast: number;
  AA: boolean;
  AALarge: boolean;
  AAA: boolean;
  AAALarge: boolean;
}
