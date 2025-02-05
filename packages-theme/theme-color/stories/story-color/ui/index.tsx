import {
  ReactElement
} from 'react';

import {
  ColorLevels,
  COLOR,
  COLOR_DARK
} from '../../../src';
import {
  DarkStyle,
  ColorBlockBase,
  ColorBlockGrid
} from '../../rc';
import {
  useStateDark
} from '../model';

import Controls from './controls';
import ColorBlockList from './color-block-list';
import GenerateGray from './generate-gray';
import GenerateColorful from './generate-colorful';

const COLOR_KEYS_GRAY = [
  'GRAY',
  'SLATE',
  'ZINC',
  'STONE'
];
const COLOR_KEYS_COLORFUL = [
  'RED',
  'ORANGE',
  'YELLOW',
  'GREEN',
  'BLUE',
  'INDIGO',
  'PURPLE'
];

export default function StoryColor(): ReactElement {
  const [dark] = useStateDark();
  
  return <>
    {dark ? <DarkStyle /> : null}
    <Controls />
    <ColorBlockGrid>
      <ColorBlockBase />
      {COLOR.GRAY.map((v, i) => <ColorBlockBase key={v}>#{i + 1}</ColorBlockBase>)}
      <GenerateGray />
      {COLOR_KEYS_GRAY.map(v => <ColorBlockList key={v} {...{
        title: v,
        lists: [(COLOR as unknown as Record<string, ColorLevels>)[v] as ColorLevels, (COLOR_DARK as unknown as Record<string, ColorLevels>)[v] as ColorLevels]
      }} />)}
      <GenerateColorful />
      {COLOR_KEYS_COLORFUL.map(v => <ColorBlockList key={v} {...{
        title: v,
        lists: [(COLOR as unknown as Record<string, ColorLevels>)[v] as ColorLevels, (COLOR_DARK as unknown as Record<string, ColorLevels>)[v] as ColorLevels]
      }} />)}
      <ColorBlockList {...{
        title: 'White Alpha',
        titleColor: 'hsl(0 0% 50%)',
        lists: [COLOR.WHITE_A, COLOR_DARK.WHITE_A]
      }} />
      <ColorBlockList {...{
        title: 'Black Alpha',
        titleColor: 'hsl(0 0% 50%)',
        lists: [COLOR.BLACK_A, COLOR_DARK.BLACK_A]
      }} />
    </ColorBlockGrid>
  </>;
}
