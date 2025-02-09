import {
  ReactElement
} from 'react';

import {
  ColorLevels
} from '../src';

import {
  ColorBlock,
  ColorBlockGrid
} from './rc';
import ColorBlockBase from './rc/color-block-base';

const GRAY_FLUENT: ColorLevels = [
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
const GRAY_RADIX: ColorLevels = [ // 去掉它的 1 阶，剩 11 阶
  'hsl(0 0% 98%)',
  'hsl(0 0% 94%)',
  'hsl(0 0% 91%)',
  'hsl(0 0% 88%)',
  'hsl(0 0% 85%)',
  'hsl(0 0% 81%)',
  'hsl(0 0% 73%)',
  'hsl(0 0% 55%)',
  'hsl(0 0% 51%)',
  'hsl(0 0% 39%)',
  'hsl(0 0% 13%)'
];
const GRAY_TAILWIND: ColorLevels = [
  'hsl(0 0% 98%)',
  'hsl(0 0% 96%)',
  'hsl(0 0% 90%)',
  'hsl(0 0% 83%)',
  'hsl(0 0% 64%)',
  'hsl(0 0% 45%)',
  'hsl(0 0% 32%)',
  'hsl(0 0% 25%)',
  'hsl(0 0% 15%)',
  'hsl(0 0% 9%)',
  'hsl(0 0% 4%)'
];
const GRAY_ANT: ColorLevels = [
  'hsl(0 0% 98%)',
  'hsl(0 0% 96.1%)',
  'hsl(0 0% 94.1%)',
  'hsl(0 0% 85.1%)',
  'hsl(0 0% 74.9%)',
  'hsl(0 0% 54.9%)',
  'hsl(0 0% 34.9%)',
  'hsl(0 0% 26.3%)',
  'hsl(0 0% 14.9%)',
  'hsl(0 0% 12.2%)',
  'hsl(0 0% 7.8%)'
];
const BLUE = [
  'hsl(220 100% 97.1%)',
  'hsl(219.6 100% 89%)',
  'hsl(220.2 100% 81%)',
  'hsl(220 100% 72.9%)',
  'hsl(220.1 100% 65.1%)',
  'hsl(220 100% 57.1%)',
  'hsl(220.1 100% 49%)',
  'hsl(219.9 100% 41%)',
  'hsl(220 100% 32.9%)',
  'hsl(219.8 100% 25.1%)',
  'hsl(220 100% 17.1%)'
];

export default function StoryColorRef(): ReactElement {
  return <ColorBlockGrid>
    <ColorBlockBase style={{ color: GRAY_FLUENT[9] }}>Fluent</ColorBlockBase>
    {GRAY_FLUENT.map(v => <ColorBlock key={v} color={v} />)}
    <ColorBlockBase style={{ color: GRAY_RADIX[9] }}>Radix</ColorBlockBase>
    {GRAY_RADIX.map(v => <ColorBlock key={v} color={v} />)}
    <ColorBlockBase style={{ color: GRAY_TAILWIND[9] }}>Tailwind</ColorBlockBase>
    {GRAY_TAILWIND.map(v => <ColorBlock key={v} color={v} />)}
    <ColorBlockBase style={{ color: GRAY_ANT[9] }}>Ant</ColorBlockBase>
    {GRAY_ANT.map(v => <ColorBlock key={v} color={v} />)}
    <ColorBlockBase style={{ color: BLUE[7] }}>Blue</ColorBlockBase>
    {BLUE.map(v => <ColorBlock key={v} color={v} />)}
  </ColorBlockGrid>;
}
