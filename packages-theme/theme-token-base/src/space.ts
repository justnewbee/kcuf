/**
 * 用于 margin padding avatar 等
 *
 * 参考
 *
 * | Lib | Levels | Url |
 * | --- | --- | --- |
 * | Radix | 9 | https://www.radix-ui.com/themes/docs/theme/spacing |
 * | Spectrum | 12 | https://spectrum.adobe.com/page/spacing |
 * | MUI | 12 | https://mui.com/material-ui/customization/spacing |
 * | Fluent | 16 | https://fluent2.microsoft.design/layout |
 * | Pluralsight | 7 | https://design-system.pluralsight.com/core/spacing |
 */
import {
  TSizeLevels
} from './types';

export const SPACE: TSizeLevels = [
  '4px',
  '8px',
  '12px',
  '16px',
  '24px',
  '32px',
  '48px',
  '64px',
  '96px'
];

// 参考 https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
export const SPACING_100 = 8;
export const SPACING_200 = 12;
export const SPACING_300 = 16;
export const SPACING_400 = 24;
export const SPACING_500 = 32;
export const SPACING_600 = 48;
