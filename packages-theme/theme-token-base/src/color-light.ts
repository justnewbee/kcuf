/**
 * 颜色参考
 *
 * | Lib | Levels (Gray / Colorful) | Url | 备注 |
 * | --- | --- | --- | --- |
 * | Radix | 12 / 12 | https://www.radix-ui.com/themes/docs/theme/color | |
 * | MUI | 10 / 10 | https://mui.com/material-ui/customization/color | |
 * | Spectrum | 11 / 14 | https://spectrum.adobe.com/page/color | 对色阶区间的用途作了说明 |
 * | Fluent | 13 / ? | https://fluent2.microsoft.design/color | 有一个很全的 Storybook 可以参考 |
 * | Pluralsight | ? / 10 | https://design-system.pluralsight.com/core/color | 比较语义化 |
 */
import {
  THsl,
  TColorLevels
} from './types';

export const GRAY_0: THsl = 'hsl(0 0% 100%)';
export const GRAY_12: THsl = 'hsl(0 0% 0%)';

export const GRAY: TColorLevels = [
  'hsl(0 0% 98%)',
  'hsl(0 0% 96.5%)',
  'hsl(0 0% 94.1%)',
  'hsl(0 0% 92.2%)',
  'hsl(0 0% 87.8%)',
  'hsl(0 0% 82.4%)',
  'hsl(0 0% 74.1%)',
  'hsl(0 0% 43.9%)',
  'hsl(0 0% 38%)',
  'hsl(0 0% 25.9%)',
  'hsl(0 0% 14.1%)'
];

export const RED: TColorLevels = [
  'hsl(0 86% 97%)',
  'hsl(0 93% 94%)',
  'hsl(0 96% 89%)',
  'hsl(0 94% 82%)',
  'hsl(0 91% 71%)',
  'hsl(0 84% 60%)',
  'hsl(0 72% 51%)',
  'hsl(0 74% 42%)',
  'hsl(0 70% 35%)',
  'hsl(0 63% 31%)',
  'hsl(0 75% 15%)'
];

export const GREEN: TColorLevels = [
  'hsl(138 76% 97%)',
  'hsl(141 84% 93%)',
  'hsl(141 79% 85%)',
  'hsl(142 77% 73%)',
  'hsl(142 69% 58%)',
  'hsl(142 71% 45%)',
  'hsl(142 76% 36%)',
  'hsl(142 72% 29%)',
  'hsl(143 64% 24%)',
  'hsl(144 61% 20%)',
  'hsl(145 80% 10%)'
];

export const BLUE: TColorLevels = [
  'hsl(214 100% 97%)',
  'hsl(214 95% 93%)',
  'hsl(213 97% 87%)',
  'hsl(212 96% 78%)',
  'hsl(213 94% 68%)',
  'hsl(217 91% 60%)',
  'hsl(221 83% 53%)',
  'hsl(224 76% 48%)',
  'hsl(226 71% 40%)',
  'hsl(224 64% 33%)',
  'hsl(226 57% 21%)'
];

export const YELLOW: TColorLevels = [
  'hsl(55 92% 95%)',
  'hsl(55 97% 88%)',
  'hsl(53 98% 77%)',
  'hsl(50 98% 64%)',
  'hsl(48 96% 53%)',
  'hsl(45 93% 47%)',
  'hsl(41 96% 40%)',
  'hsl(35 92% 33%)',
  'hsl(32 81% 29%)',
  'hsl(28 73% 26%)',
  'hsl(26 83% 14%)'
];

export const ORANGE: TColorLevels = [
  'hsl(33 100% 96%)',
  'hsl(34 100% 92%)',
  'hsl(32 98% 83%)',
  'hsl(31 97% 72%)',
  'hsl(27 96% 61%)',
  'hsl(25 95% 53%)',
  'hsl(21 90% 48%)',
  'hsl(17 88% 40%)',
  'hsl(15 79% 34%)',
  'hsl(15 75% 28%)',
  'hsl(13 81% 15%)'
];

export const PURPLE: TColorLevels = [
  'hsl(270 100% 98%)',
  'hsl(269 100% 95%)',
  'hsl(269 100% 92%)',
  'hsl(269 97% 85%)',
  'hsl(270 95% 75%)',
  'hsl(271 91% 65%)',
  'hsl(271 81% 56%)',
  'hsl(272 72% 47%)',
  'hsl(273 67% 39%)',
  'hsl(274 66% 32%)',
  'hsl(274 87% 21%)'
];

export const WHITE_A: TColorLevels = [
  'hsl(0 0% 100% / 5%)',
  'hsl(0 0% 100% / 10%)',
  'hsl(0 0% 100% / 15%)',
  'hsl(0 0% 100% / 20%)',
  'hsl(0 0% 100% / 30%)',
  'hsl(0 0% 100% / 40%)',
  'hsl(0 0% 100% / 50%)',
  'hsl(0 0% 100% / 60%)',
  'hsl(0 0% 100% / 70%)',
  'hsl(0 0% 100% / 80%)',
  'hsl(0 0% 100% / 90%)'
];

export const BLACK_A: TColorLevels = [
  'hsl(0 0% 0% / 5%)',
  'hsl(0 0% 0% / 10%)',
  'hsl(0 0% 0% / 15%)',
  'hsl(0 0% 0% / 20%)',
  'hsl(0 0% 0% / 30%)',
  'hsl(0 0% 0% / 40%)',
  'hsl(0 0% 0% / 50%)',
  'hsl(0 0% 0% / 60%)',
  'hsl(0 0% 0% / 70%)',
  'hsl(0 0% 0% / 80%)',
  'hsl(0 0% 0% / 90%)'
];

// 灰色变体
// SLATE
//   hsl(214 40% 98%)
//   hsl(214 40% 96%)
//   hsl(214 32% 94%)
//   hsl(214 27% 92%)
//   hsl(214 20% 88%)
//   hsl(214 19% 82%)
//   hsl(214 25% 76%)
//   hsl(214 21% 45%)
//   hsl(214 23% 40%)
//   hsl(214 28% 27%)
//   hsl(214 27% 15%)
// ZINC
//   hsl(240 20% 98%)
//   hsl(240 20% 96%)
//   hsl(240 20% 94%)
//   hsl(240 20% 92%)
//   hsl(240 13% 89%)
//   hsl(240 22% 85%)
//   hsl(240 21% 78%)
//   hsl(240 21% 52%)
//   hsl(240 19% 45%)
//   hsl(240 19% 30%)
//   hsl(240 19% 17%)
// OLIVE
//   hsl(103 20% 98%)
//   hsl(103 20% 96%)
//   hsl(103 20% 94%)
//   hsl(103 20% 92%)
//   hsl(103 22% 87%)
//   hsl(103 19% 80%)
//   hsl(103 28% 69%)
//   hsl(103 17% 40%)
//   hsl(103 20% 34%)
//   hsl(102 19% 23%)
//   hsl(106 13% 14%)
// STONE
//   hsl(30 20% 98%)
//   hsl(30 20% 96%)
//   hsl(30 20% 94%)
//   hsl(30 20% 92%)
//   hsl(30 22% 87%)
//   hsl(32 19% 80%)
//   hsl(30 25% 73%)
//   hsl(33 20% 42%)
//   hsl(30 20% 37%)
//   hsl(30 19% 25%)
//   hsl(29 21% 14%)