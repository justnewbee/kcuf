import {
  parseToHsl
} from 'polished';

import {
  TupleOf
} from '@kcuf/ts-missing-helpers';

import {
  ColorLevels
} from '../../src';

import composeHslColorString from './compose-hsl-color-string';

const LIGHTNESS_LEVELS: TupleOf<number, 11> = [
  0.97, 0.89, 0.81, 0.73, 0.65, 0.57, 0.49, 0.41, 0.33, 0.25, 0.17
];

// const hueStep = 2; // 色相阶梯
// const saturationStep = 0.16; // 饱和度阶梯，浅色部分
// const saturationStep2 = 0.05; // 饱和度阶梯，深色部分
// const brightnessStep1 = 0.05; // 亮度阶梯，浅色部分
// const brightnessStep2 = 0.15; // 亮度阶梯，深色部分
// const lightColorCount = 5; // 浅色数量，主色上
// const darkColorCount = 4; // 深色数量，主色下
//
// // 暗色主题颜色映射关系表
// const darkMix: TupleOf<number, 11> = [
//   0.98, 0.97, 0.95, 0.90, 0.85, 0.65, 0.45, 0.30, 0.25, 0.15, 0.1
// ];
//
// interface HsvObject {
//   h: number;
//   s: number;
//   v: number;
// }
//
// function getHue(hsv: HsvObject, i: number, light?: boolean): number {
//   let hue: number;
//   // 根据色相不同，色相转向不同
//   if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
//     hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
//   } else {
//     hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
//   }
//   if (hue < 0) {
//     hue += 360;
//   } else if (hue >= 360) {
//     hue -= 360;
//   }
//   return hue;
// }
//
// function getSaturation(hsv: HsvObject, i: number, light?: boolean): number {
//   // grey color don't change saturation
//   if (hsv.h === 0 && hsv.s === 0) {
//     return hsv.s;
//   }
//   let saturation: number;
//   if (light) {
//     saturation = hsv.s - saturationStep * i;
//   } else if (i === darkColorCount) {
//     saturation = hsv.s + saturationStep;
//   } else {
//     saturation = hsv.s + saturationStep2 * i;
//   }
//   // 边界值修正
//   if (saturation > 1) {
//     saturation = 1;
//   }
//   // 第一格的 s 限制在 0.06-0.1 之间
//   if (light && i === lightColorCount && saturation > 0.1) {
//     saturation = 0.1;
//   }
//   if (saturation < 0.06) {
//     saturation = 0.06;
//   }
//   return Math.round(saturation * 100) / 100;
// }
//
// function getValue(hsv: HsvObject, i: number, light?: boolean): number {
//   let value: number;
//   if (light) {
//     value = hsv.v + brightnessStep1 * i;
//   } else {
//     value = hsv.v - brightnessStep2 * i;
//   }
//   // Clamp value between 0 and 1
//   value = Math.max(0, Math.min(1, value));
//   return Math.round(value * 100) / 100;
// }
//
// interface Opts {
//   theme?: 'dark' | 'default';
//   backgroundColor?: string;
// }

export default function generateColors(color: string, dark?: boolean): ColorLevels {
  const {
    hue,
    saturation
  } = parseToHsl(color);
  
  const colors: ColorLevels = [
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[0]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[1]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[2]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[3]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[4]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[5]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[6]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[7]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[8]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[9]),
    composeHslColorString(hue, saturation, LIGHTNESS_LEVELS[10])
  ];
  
  // const patterns: FastColor[] = [];
  // const pColor = new FastColor(color);
  // const hsv = pColor.toHsv();
  //
  // for (let i = lightColorCount; i > 0; i -= 1) {
  //   const c = new FastColor({
  //     h: getHue(hsv, i, true),
  //     s: getSaturation(hsv, i, true),
  //     v: getValue(hsv, i, true)
  //   });
  //   patterns.push(c);
  // }
  // patterns.push(pColor);
  // for (let i = 1; i <= darkColorCount; i += 1) {
  //   const c = new FastColor({
  //     h: getHue(hsv, i),
  //     s: getSaturation(hsv, i),
  //     v: getValue(hsv, i)
  //   });
  //   patterns.push(c);
  // }
  
  /* .map((v, i) => toHslColorString(mix(darkMix[i], '#141414', v))) */
  return dark ? colors.reverse() as ColorLevels : colors;
}
