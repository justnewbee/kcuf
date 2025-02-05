interface IWithAlpha {
  a?: number; // 0-100
}

export interface IColorRgb extends IWithAlpha {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

export interface IColorHsl extends IWithAlpha {
  h: number; // 0-359
  s: number; // 0-100
  l: number; // 0-100
}

export interface IColorHsv extends IWithAlpha {
  h: number; // 0-359
  s: number; // 0-100
  v: number; // 0-100
}

export interface IColorHwb extends IWithAlpha {
  h: number;
  w: number;
  b: number;
}

export type THslString = `hsl(${number} ${number}% ${number}%)` | `hsl(${number} ${number}% ${number}% / ${number}%)`;

export interface IContrastScores {
  contrast: number;
  AA: boolean;
  AALarge: boolean;
  AAA: boolean;
  AAALarge: boolean;
}
