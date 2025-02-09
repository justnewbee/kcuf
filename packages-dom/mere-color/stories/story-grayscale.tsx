import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';
import {
  grayscale as polishedGrayscale
} from 'polished';
import {
  colord
} from 'colord';
import Color from 'color';
import tinycolor2 from 'tinycolor2';
// import chroma from 'chroma-js';

import {
  InputColor
} from '@kcuf/demo-rc';

import {
  grayscale
} from '../src';

import ColorGrid from './rc/color-grid';

const ScGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export default function StoryGrayscale(): ReactElement {
  const [stateColor, setStateColor] = useState('#ff0000');
  
  return <>
    <InputColor {...{
      value: stateColor,
      onChange: setStateColor
    }} />
    <ScGrid>
      <ColorGrid {...{
        title: 'mere-color',
        color: grayscale(stateColor)
      }} />
      <ColorGrid {...{
        title: 'polished',
        color: polishedGrayscale(stateColor)
      }} />
      <ColorGrid {...{
        title: 'colord',
        color: colord(stateColor).grayscale().toHex()
      }} />
      <ColorGrid {...{
        title: 'color',
        color: new Color(stateColor).grayscale().toString()
      }} />
      <ColorGrid {...{
        title: 'tinycolor2',
        color: tinycolor2(stateColor).greyscale().toString('hex')
      }} />
      <ColorGrid {...{
        title: 'chroma-js'
      }} />
    </ScGrid>
  </>;
}
