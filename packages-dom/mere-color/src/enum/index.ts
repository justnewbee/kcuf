export enum EColorNotationDetailed {
  UNKNOWN = '_unknown',
  NAME = 'name',
  HEX3 = 'hex3',
  HEX4 = 'hex4',
  HEX6 = 'hex6',
  HEX8 = 'hex8',
  RGB = 'rgb',
  RGB_LEGACY = 'rgb-legacy',
  HSL = 'hsl',
  HSL_LEGACY = 'hsl-legacy'
}

export enum EColorNotation {
  HEX = 'hex',
  RGB = 'rgb',
  HSL = 'hsl'
}

/**
 * Hue unit - Valid CSS <angle> units.
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/angle
 */
export enum EHueUnit {
  DEGREE = 'deg', // 360° → 1turn
  RADIAN = 'rad', // 2π → 1turn
  GRADIAN = 'grad', // 400 → 1turn
  TURN = 'turn'
}
