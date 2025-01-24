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
 *
 * 主要参考自 <https://tailwindcss.com/docs/customizing-colors>，有部分调整
 */
import {
  THsl,
  TColorLevels
} from './types';

// 色值后边的值为其在白底上的 contrast 值

export const GRAY_0: THsl = 'hsl(0 0% 100%)'; // white → 1.0
export const GRAY_12: THsl = 'hsl(0 0% 0%)'; // black → 21.0

export const GRAY: TColorLevels = [
  'hsl(0 0% 99%)', // 1.03
  'hsl(0 0% 97%)', // 1.07
  'hsl(0 0% 94%)', // 1.14
  'hsl(0 0% 92%)', // 1.19
  'hsl(0 0% 87%)', // 1.35
  'hsl(0 0% 82%)', // 1.53
  'hsl(0 0% 74%)', // 1.88
  'hsl(0 0% 43%)', // 5.1 / AA
  'hsl(0 0% 37%)', // 6.48 / AA
  'hsl(0 0% 26%)', // 10.1 / AAA
  'hsl(0 0% 14%)' // 15.44 / AAA
];

export const SLATE: TColorLevels = [
  'hsl(214 42.9% 99%)', // 1.03
  'hsl(214 40% 97%)', // 1.07
  'hsl(214 32% 94%)', // 1.15
  'hsl(214 27% 92%)', // 1.21
  'hsl(214 25% 88%)', // 1.34
  'hsl(214 22% 83%)', // 1.52
  'hsl(214 20% 75%)', // 1.88
  'hsl(214 14% 44%)', // 5.2 / AA
  'hsl(214 14% 38%)', // 6.52 / AA
  'hsl(214 17% 27%)', // 10 / AAA
  'hsl(214 14% 15%)' // 15.44 / AAA
];

export const ZINC: TColorLevels = [
  'hsl(240 20% 99%)', // 1.03
  'hsl(240 20% 97%)', // 1.08
  'hsl(240 20% 95%)', // 1.14
  'hsl(240 20% 93%)', // 1.2
  'hsl(240 20% 89%)', // 1.35
  'hsl(240 19% 85%)', // 1.51
  'hsl(240 22% 78%)', // 1.88
  'hsl(240 12% 47%)', // 5.3 / AA
  'hsl(240 13% 41%)', // 6.56 / AA
  'hsl(240 16% 29%)', // 10.4 / AAA
  'hsl(240 17% 16%)' // 15.67 / AAA
];

export const STONE: TColorLevels = [
  'hsl(30 20% 99%)', // 1.02
  'hsl(30 20% 97%)', // 1.07
  'hsl(30 20% 94%)', // 1.14
  'hsl(30 20% 92%)', // 1.19
  'hsl(30 22% 87%)', // 1.33
  'hsl(32 20% 82%)', // 1.5
  'hsl(30 20% 73.9%)', // 1.9
  'hsl(33 12% 41%)', // 5.28 / AA
  'hsl(30 13% 36%)', // 6.48 / AA
  'hsl(30 17% 25%)', // 10.1 / AAA
  'hsl(29 21% 14%)' // 15.44 / AAA
];

export const BLUE: TColorLevels = [
  'hsl(214 100% 98%)',
  'hsl(214 95% 95%)',
  'hsl(213 97% 92%)',
  'hsl(212 96% 78%)',
  'hsl(213 94% 68%)',
  'hsl(217 91% 60%)',
  'hsl(221 83% 53%)',
  'hsl(224 76% 48%)',
  'hsl(226 71% 40%)',
  'hsl(224 64% 33%)',
  'hsl(226 57% 21%)'
];

export const INDIGO: TColorLevels = [
  'hsl(226 100% 97%)',
  'hsl(226 100% 94%)',
  'hsl(228 96% 89%)',
  'hsl(230 94% 82%)',
  'hsl(234 89% 74%)',
  'hsl(239 84% 67%)',
  'hsl(243 75% 59%)',
  'hsl(245 58% 51%)',
  'hsl(244 55% 41%)',
  'hsl(242 47% 34%)',
  'hsl(244 47% 20%)'
];

export const VIOLET: TColorLevels = [
  'hsl(250 100% 98%)',
  'hsl(251 91% 95%)',
  'hsl(251 95% 92%)',
  'hsl(252 95% 85%)',
  'hsl(255 92% 76%)',
  'hsl(258 90% 66%)',
  'hsl(262 83% 58%)',
  'hsl(263 70% 50%)',
  'hsl(263 69% 42%)',
  'hsl(264 67% 35%)',
  'hsl(261 73% 23%)'
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
