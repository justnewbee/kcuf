import {
  extend
} from 'colord';
import colordPluginMix from 'colord/plugins/mix';
import colordPluginA11y from 'colord/plugins/a11y';
import {
  extendPlugins
} from 'colormaster';
import colormasterPluginA11y from 'colormaster/plugins/accessibility';
import colormasterPluginMix from 'colormaster/plugins/mix';

extend([
  colordPluginMix,
  colordPluginA11y
]);

extendPlugins([
  colormasterPluginA11y,
  colormasterPluginMix
]);

export { default as getComparisonToHex } from './get-comparison-to-hex';
export { default as getComparisonToRgb } from './get-comparison-to-rgb';
export { default as getComparisonToHsl } from './get-comparison-to-hsl';
export { default as getComparisonGenerateRandom } from './get-comparison-generate-random';
export { default as getComparisonGenerateGrayscale } from './get-comparison-generate-grayscale';
export { default as getComparisonGenerateRotate } from './get-comparison-generate-rotate';
export { default as getComparisonGenerateDesaturate } from './get-comparison-generate-desaturate';
export { default as getComparisonGenerateSaturate } from './get-comparison-generate-saturate';
export { default as getComparisonGenerateDarken } from './get-comparison-generate-darken';
export { default as getComparisonGenerateLighten } from './get-comparison-generate-lighten';
export { default as getComparisonGenerateInvert } from './get-comparison-generate-invert';
export { default as getComparisonGenerateMix } from './get-comparison-generate-mix';
export { default as getComparisonGenerateTint } from './get-comparison-generate-tint';
export { default as getComparisonGenerateShade } from './get-comparison-generate-shade';
export { default as getComparisonA11yLuminance } from './get-comparison-a11y-luminance';
export { default as getComparisonA11yContrast } from './get-comparison-a11y-contrast';
