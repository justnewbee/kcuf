import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';
import {
  mix as polishedMix
} from 'polished';
import {
  colord,
  extend
} from 'colord';
import colordPluginMix from 'colord/plugins/mix';
import Color from 'color';
import tinycolor2 from 'tinycolor2';
import chroma from 'chroma-js';

import {
  InputColor
} from '@kcuf/demo-rc';

import {
  mix
} from '../src';

import ColorGrid from './rc/color-grid';

extend([colordPluginMix]);

const ScGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export default function StoryMix(): ReactElement {
  const [stateColor1, setStateColor1] = useState('#ff0000');
  const [stateColor2, setStateColor2] = useState('#0000ff');
  
  return <div>
    <InputColor {...{
      value: stateColor1,
      onChange: setStateColor1
    }} />
    <InputColor {...{
      value: stateColor2,
      onChange: setStateColor2
    }} />
    <ScGrid>
      <ColorGrid {...{
        title: 'mere-color',
        color: mix(stateColor1, stateColor2)
      }} />
      <ColorGrid {...{
        title: 'polished',
        color: polishedMix(0.5, stateColor1, stateColor2)
      }} />
      <ColorGrid {...{
        title: 'colord',
        color: colord(stateColor1).mix(stateColor2).toHex()
      }} />
      <ColorGrid {...{
        title: 'color',
        color: new Color(stateColor1).mix(Color(stateColor2)).toString()
      }} />
      <ColorGrid {...{
        title: 'tinycolor2',
        color: tinycolor2.mix(stateColor1, stateColor2).toString('hex')
      }} />
      <ColorGrid {...{
        title: 'chroma-js',
        color: chroma.mix(stateColor1, stateColor2).hex()
      }} />
    </ScGrid>
  </div>;
}
