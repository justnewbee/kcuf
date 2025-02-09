import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';
import {
  invert as polishedInvert
} from 'polished';
import {
  colord
} from 'colord';
import Color from 'color';
// import tinycolor2 from 'tinycolor2';
// import chroma from 'chroma-js';

import {
  InputColor
} from '@kcuf/demo-rc';

import {
  invert
} from '../src';

import ColorGrid from './rc/color-grid';

const ScGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export default function StoryInvert(): ReactElement {
  const [stateColor, setStateColor] = useState('#ff0000');
  
  return <div>
    <InputColor {...{
      value: stateColor,
      onChange: setStateColor
    }} />
    <ScGrid>
      <ColorGrid {...{
        title: 'mere-color',
        color: invert(stateColor)
      }} />
      <ColorGrid {...{
        title: 'polished',
        color: polishedInvert(stateColor)
      }} />
      <ColorGrid {...{
        title: 'colord',
        color: colord(stateColor).invert().toHex()
      }} />
      <ColorGrid {...{
        title: 'color',
        color: new Color(stateColor).negate().hex()
      }} />
      <ColorGrid {...{
        title: 'tinycolor2'
      }} />
      <ColorGrid {...{
        title: 'chroma-js'
      }} />
    </ScGrid>
  </div>;
}
