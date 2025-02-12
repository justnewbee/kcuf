import {
  TupleOf
} from '@kcuf/ts-missing-helpers';
import {
  adjustLightnessForContrast
} from '@kcuf/mere-color';

import {
  ColorLevels
} from '../../src';

interface IOptions {
  gray?: boolean;
  dark?: boolean;
}

const CONTRAST_LEVEL_GRAY: TupleOf<number, 11> = [
  1.04,
  1.09,
  1.14,
  1.19,
  1.35,
  1.53,
  1.88,
  5.1,
  6.18,
  10.4,
  15.44
];

// 选取 Hue 220 蓝色，均匀分布的 Lightness 得到的 11 阶 Contract 值
const CONTRAST_LEVEL_COLORFUL: TupleOf<number, 11> = [
  1.09,
  1.4,
  1.87,
  2.57,
  3.34,
  4.47,
  5.8,
  7.29,
  10.19,
  12.5,
  15.91
];

export default function generateColorLevel(color: string, {
  gray,
  dark
}: IOptions = {}): ColorLevels {
  return (gray ? CONTRAST_LEVEL_GRAY : CONTRAST_LEVEL_COLORFUL).map(v => adjustLightnessForContrast(color, v, {
    bgc: dark ? '#000' : '#fff'
  })) as ColorLevels;
}
