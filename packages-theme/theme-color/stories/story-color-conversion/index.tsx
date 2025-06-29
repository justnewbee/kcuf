import {
  ReactElement
} from 'react';

import {
  H1
} from '@kcuf/demo-rc';

import RgbaToRgb from './rgba-to-rgb';
import RgbToRgba from './rgb-to-rgba';

/**
 * RGB ↔ RGBA 互换
 */
export default function StoryColorConversion(): ReactElement {
  return <>
    <H1>颜色计算</H1>
    <RgbaToRgb />
    <RgbToRgba /></>;
}
