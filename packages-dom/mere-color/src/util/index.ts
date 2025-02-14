// --- input is string --- //
export { default as parseToHslUnnormalized } from './parse-to-hsl-unnormalized';
export { default as parseToRgbUnnormalized } from './parse-to-rgb-unnormalized';
export { default as getColorNotationDetailed } from './get-color-notation-detailed';
export { default as getColorNotation } from './get-color-notation';

// --- input is rgb --- //
export { default as rgbNormalize } from './rgb-normalize';
export { default as rgbToString } from './rgb-to-string';
export { default as rgbToHex } from './rgb-to-hex';
export { default as rgbToHsl } from './rgb-to-hsl';
export { default as rgbToHsv } from './rgb-to-hsv';

export { default as rgbComputeBrightness } from './rgb-compute-brightness';
export { default as rgbComputeLuminance } from './rgb-compute-luminance';

export { default as rgbGrayscale } from './rgb-grayscale';
export { default as rgbInvert } from './rgb-invert';
export { default as rgbShiftAlpha } from './rgb-shift-alpha';
export { default as rgbMix } from './rgb-mix';

// --- input is hsl --- //
export { default as hslNormalize } from './hsl-normalize';
export { default as hslToString } from './hsl-to-string';
export { default as hslToHex } from './hsl-to-hex';
export { default as hslToRgb } from './hsl-to-rgb';
export { default as hslToHsv } from './hsl-to-hsv';

export { default as hslShiftHue } from './hsl-shift-hue';
export { default as hslShiftSaturation } from './hsl-shift-saturation';
export { default as hslShiftLightness } from './hsl-shift-lightness';

// --- input is hsv --- //
export { default as hsvToHsl } from './hsv-to-hsl';
export { default as hsvToRgb } from './hsv-to-rgb';

// --- misc --- //
export { default as computeContrast } from './compute-contrast';
export { default as manipulateRgb } from './manipulate-rgb';
export { default as manipulateHsl } from './manipulate-hsl';
export { default as toColorString } from './to-color-string';
export { default as toColorStringOriginalNotation } from './to-color-string-original-notation';
