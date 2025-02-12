import {
  extend
} from 'colord';
import colordPluginMix from 'colord/plugins/mix';
import colordPluginA11y from 'colord/plugins/a11y';

extend([
  colordPluginMix,
  colordPluginA11y
]);

export { default as getComparisonToHex } from './get-comparison-to-hex';
export { default as getComparisonToRgb } from './get-comparison-to-rgb';
export { default as getComparisonToHsl } from './get-comparison-to-hsl';
export { default as getComparisonGrayscale } from './get-comparison-grayscale';
export { default as getComparisonRotate } from './get-comparison-rotate';
export { default as getComparisonDesaturate } from './get-comparison-desaturate';
export { default as getComparisonSaturate } from './get-comparison-saturate';
export { default as getComparisonDarken } from './get-comparison-darken';
export { default as getComparisonLighten } from './get-comparison-lighten';
export { default as getComparisonInvert } from './get-comparison-invert';
export { default as getComparisonMix } from './get-comparison-mix';
export { default as getComparisonTint } from './get-comparison-tint';
export { default as getComparisonShade } from './get-comparison-shade';
export { default as getComparisonLuminance } from './get-comparison-luminance';
export { default as getComparisonContrast } from './get-comparison-contrast';
