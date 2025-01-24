import {
  ReactElement
} from 'react';

import {
  COLOR,
  COLOR_DARK
} from '../../../src';
import {
  ColorBlockBase,
  ColorBlockGrid
} from '../../rc';

import Note from './note';
import Toggles from './toggles';
import GlobalStyle from './global-style';
import ColorBlockList from './color-block-list';

export default function StoryColor(): ReactElement {
  return <>
    <Note />
    <Toggles />
    <GlobalStyle />
    <ColorBlockGrid>
      <ColorBlockBase />
      {COLOR.GRAY.map((v, i) => <ColorBlockBase key={v}>#{i + 1}</ColorBlockBase>)}
      <ColorBlockList {...{
        title: 'Gray',
        lists: [COLOR.GRAY, COLOR_DARK.GRAY]
      }} />
      <ColorBlockList {...{
        title: 'Slate',
        lists: [COLOR.SLATE, COLOR_DARK.SLATE]
      }} />
      <ColorBlockList {...{
        title: 'Zinc',
        lists: [COLOR.ZINC, COLOR_DARK.ZINC]
      }} />
      <ColorBlockList {...{
        title: 'Stone',
        lists: [COLOR.STONE, COLOR_DARK.STONE]
      }} />
      <ColorBlockList {...{
        title: 'Blue',
        lists: [COLOR.BLUE, COLOR_DARK.BLUE]
      }} />
      <ColorBlockList {...{
        title: 'Indigo',
        lists: [COLOR.INDIGO, COLOR_DARK.INDIGO]
      }} />
      <ColorBlockList {...{
        title: 'Violet',
        lists: [COLOR.VIOLET, COLOR_DARK.VIOLET]
      }} />
      <ColorBlockList {...{
        title: 'Purple',
        lists: [COLOR.PURPLE, COLOR_DARK.PURPLE]
      }} />
      <ColorBlockList {...{
        title: 'Red',
        lists: [COLOR.RED, COLOR_DARK.RED]
      }} />
      <ColorBlockList {...{
        title: 'Orange',
        lists: [COLOR.ORANGE, COLOR_DARK.ORANGE]
      }} />
      <ColorBlockList {...{
        title: 'Yellow',
        lists: [COLOR.YELLOW, COLOR_DARK.YELLOW]
      }} />
      <ColorBlockList {...{
        title: 'Green',
        lists: [COLOR.GREEN, COLOR_DARK.GREEN]
      }} />
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
