import {
  ReactElement,
  useCallback,
  useState
} from 'react';
import styled, {
  createGlobalStyle
} from 'styled-components';

import {
  COLOR_LIGHT,
  COLOR_DARK
} from '../src';

import ColorBlockList from './rc/color-block-list';

const ScButton = styled.button`
  border: none;
  background: none;
  font-size: 20px;
`;
const ScGrayGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  font-size: 12px;
  font-family: Arial, sans-serif;
  text-align: center;
`;
const ScNumber = styled.div`
  margin-bottom: 12px;
  color: hsl(0 0% 47%);
`;

const GlobalStyleDark = createGlobalStyle`
  body {
    background-color: hsl(0 4% 5%);
    color: hsl(0 0% 100%);
  }
`;

export default function StoryColor(): ReactElement {
  const [stateDark, setStateDark] = useState(false);
  const [stateText, setStateText] = useState(false);
  const handleToggleDark = useCallback(() => setStateDark(prevState => !prevState), [setStateDark]);
  const handleToggleText = useCallback(() => setStateText(prevState => !prevState), [setStateText]);
  
  return <>
    <ScButton onClick={handleToggleDark}>{stateDark ? '🌙' : '🌞'}</ScButton>
    <ScButton onClick={handleToggleText}>{stateText ? '🅰️' : '🟣'}</ScButton>
    {stateDark ? <GlobalStyleDark /> : null}
    <ScGrayGrid>
      <ScNumber />
      {COLOR_LIGHT.GRAY.map((v, i) => <ScNumber key={v}>{i + 1}</ScNumber>)}
      <ColorBlockList {...{
        title: 'Gray',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.GRAY, COLOR_DARK.GRAY]
      }} />
      <ColorBlockList {...{
        title: 'Red',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.RED, COLOR_DARK.RED]
      }} />
      <ColorBlockList {...{
        title: 'Green',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.GREEN, COLOR_DARK.GREEN]
      }} />
      <ColorBlockList {...{
        title: 'Blue',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.BLUE, COLOR_DARK.BLUE]
      }} />
      <ColorBlockList {...{
        title: 'Yellow',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.YELLOW, COLOR_DARK.YELLOW]
      }} />
      <ColorBlockList {...{
        title: 'Orange',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.ORANGE, COLOR_DARK.ORANGE]
      }} />
      <ColorBlockList {...{
        title: 'Purple',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.PURPLE, COLOR_DARK.PURPLE]
      }} />
      <ColorBlockList {...{
        title: 'White Alpha',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.WHITE_A, COLOR_DARK.WHITE_A],
        transparent: true
      }} />
      <ColorBlockList {...{
        title: 'Black Alpha',
        dark: stateDark,
        text: stateText,
        lists: [COLOR_LIGHT.BLACK_A, COLOR_DARK.BLACK_A],
        transparent: true
      }} />
    </ScGrayGrid>
  </>;
}
