/**
 * 字体参考
 *
 * - https://www.radix-ui.com/themes/docs/theme/typography#font-family
 * - https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
 * - https://markdotto.com/2018/02/07/github-system-fonts/
 * - https://mui.com/material-ui/customization/typography/
 *
 * font-size 参考
 *
 * | Lib | Levels | Url | 备注 |
 * | --- | --- | --- | --- |
 * | Radix | 9 | https://www.radix-ui.com/themes/docs/theme/typography#type-scale | `font-size` + `letter-spacing` + `line-height` 组合明细表 ★★★★ |
 * | Spectrum | 15 | https://spectrum.adobe.com/page/typography | |
 * | MUI | 13 | https://mui.com/material-ui/customization/typography/#font-size | 有个数学公式计算 rem，并且有 responsive |
 * | Fluent | 10 | https://fluent2.microsoft.design/typography | 场景 + `font-weight` + `font-size` + `line-height` 组合明细表 |
 * | Pluralsight | 10 | https://design-system.pluralsight.com/core/typography#font-size | 只有它选 16 作默认 |
 *
 * line-height 参考
 *
 * | Lib | Levels | Url | 备注 |
 * | --- | --- | --- | --- |
 * | Radix | 9 | https://www.radix-ui.com/themes/docs/theme/typography#type-scale | |
 * | Spectrum | 4 | https://spectrum.adobe.com/page/typography | 不用绝对值 |
 * | MUI | 5 | https://mui.com/joy-ui/migration/migrating-default-theme/#line-height | |
 * | Fluent | 10 | https://fluent2.microsoft.design/typography | |
 * | Pluralsight | 4 | https://design-system.pluralsight.com/core/typography#line-height | |
 */
import {
  TSizeLevels
} from './types';

export const FONT_FAMILY_SANS = '"-apple-system", BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

// 等宽字体
export const FONT_FAMILY_MONO = '"Operator Mono", Menlo, Monaco, "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace';

export const FONT_SIZE: TSizeLevels = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '35px',
  '60px'
];

export const LINE_HEIGHT: TSizeLevels = [
  '16px',
  '20px',
  '24px',
  '26px',
  '28px',
  '30px',
  '36px',
  '40px',
  '60px'
];

export const LINE_HEIGHT_HEADING: TSizeLevels = [
  '16px',
  '18px',
  '22px',
  '24px',
  '26px',
  '30px',
  '36px',
  '40px',
  '60px'
];
