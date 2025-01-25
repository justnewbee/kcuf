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

import Note from './note';
import Controls from './controls';
import ColorBlockList from './color-block-list';

const COLOR_KEYS = [
  'GRAY',
  'SLATE',
  'ZINC',
  'STONE',
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
    <Note />
    <Controls />
    <ColorBlockGrid>
      <ColorBlockBase />
      {COLOR.GRAY.map((v, i) => <ColorBlockBase key={v}>#{i + 1}</ColorBlockBase>)}
      {COLOR_KEYS.map(v => <ColorBlockList key={v} {...{
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
