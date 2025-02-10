import {
  ReactElement,
  useState
} from 'react';
import styled from 'styled-components';

import {
  InputColor,
  InputRange
} from '@kcuf/demo-rc';

import {
  getComparisonToHex,
  getComparisonToRgb,
  getComparisonToHsl,
  getComparisonGrayscale,
  getComparisonDarken,
  getComparisonLighten,
  getComparisonRotate,
  getComparisonInvert,
  getComparisonMix,
  getComparisonLuminance,
  getComparisonContrast
} from './util';
import ColorGrid from './rc/color-grid';

const ScGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
`;
const ScTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  font-weight: 600;
`;

const TITLES = [
  '',
  'mere-color',
  'polished',
  'colord',
  'color',
  'tinycolor2',
  'chroma-js',
  'culori'
];

export default function StoryComparison(): ReactElement {
  const [stateColor, setStateColor] = useState('#ff0000');
  const [stateColor2, setStateColor2] = useState('#0000ff');
  const [stateDarkenAmount, setStateDarkenAmount] = useState(15);
  const [stateLightenAmount, setStateLightenAmount] = useState(15);
  const [stateRotateAmount, setStateRotateAmount] = useState(45);
  
  return <>
    <InputColor {...{
      value: stateColor,
      onChange: setStateColor
    }} />
    <ScGrid>
      {TITLES.map(v => <ScTitle key={v}>{v}</ScTitle>)}
      <ScTitle>toStringHex(c)</ScTitle>
      {getComparisonToHex(stateColor).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>toStringRgb(c)</ScTitle>
      {getComparisonToRgb(stateColor).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>toStringHsl(c)</ScTitle>
      {getComparisonToHsl(stateColor).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>grayscale(c)</ScTitle>
      {getComparisonGrayscale(stateColor).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>
        <span>darken(c, {stateDarkenAmount})</span>
        <InputRange {...{
          min: 0,
          max: 100,
          value: stateDarkenAmount,
          onChange: setStateDarkenAmount
        }} />
      </ScTitle>
      {getComparisonDarken(stateColor, stateDarkenAmount).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>
        <span>lighten(c, {stateLightenAmount})</span>
        <InputRange {...{
          min: 0,
          max: 100,
          value: stateLightenAmount,
          onChange: setStateLightenAmount
        }} />
      </ScTitle>
      {getComparisonLighten(stateColor, stateLightenAmount).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>
        <span>rotate(c, stateRotateAmount)</span>
        <InputRange {...{
          min: 0,
          max: 360,
          value: stateRotateAmount,
          onChange: setStateRotateAmount
        }} />
      </ScTitle>
      {getComparisonRotate(stateColor, stateRotateAmount).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>invert(c)</ScTitle>
      {getComparisonInvert(stateColor).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>
        <span>mix(c1, c2)</span>
        <InputColor {...{
          value: stateColor2,
          onChange: setStateColor2
        }} />
      </ScTitle>
      {getComparisonMix(stateColor, stateColor2).map(v => <ColorGrid key={v.key} {...{
        color: v.result,
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>luminance(c)</ScTitle>
      {getComparisonLuminance(stateColor).map(v => <ColorGrid key={v.key} {...{
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>contrast(c1)</ScTitle>
      {getComparisonContrast(stateColor).map(v => <ColorGrid key={v.key} {...{
        result: v.result,
        code: v.code
      }} />)}
      <ScTitle>contrast(c1, black)</ScTitle>
      {getComparisonContrast(stateColor, true).map(v => <ColorGrid key={v.key} {...{
        result: v.result,
        code: v.code
      }} />)}
    </ScGrid>
  </>;
}
