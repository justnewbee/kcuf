import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  ThemeToggleClassic,
  ThemeToggleAround,
  ThemeToggleExpand,
  ThemeToggleDarkSide,
  ThemeToggleDarkInner,
  ThemeToggleInnerMoon,
  ThemeToggleWithin,
  ThemeToggleHalfSun,
  ThemeToggleHorizon,
  ThemeToggleEclipse,
  ThemeToggleSimple
} from '../src';

import DemoItem from './demo-item';

const ScToggleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export default function StoryDefault(): ReactElement {
  return <ScToggleContainer>
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleClassic,
      title: 'Classic',
      description: 'The toggle that started it all'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleAround,
      title: 'Around',
      description: 'The sun rays appear/disappear in a sequence'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleExpand,
      title: 'Expand',
      description: 'Expands into a moon'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleDarkSide,
      title: 'Dark Side',
      description: 'Subtle and minimalistic'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleDarkInner,
      title: 'DarkInner',
      description: 'A more complicated dark side animation'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleInnerMoon,
      title: 'Inner Moon',
      description: 'Inspired by Google fonts toggle'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleWithin,
      title: 'Within',
      description: 'The sun collapses and a moon appears within'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleHalfSun,
      title: 'HalfSun',
      description: 'Similar to dark side but with sun rays'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleHorizon,
      title: 'Horizon',
      description: 'The sun rises and sets over horizon'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleEclipse,
      title: 'Eclipse',
      description: 'The moon moves across the sun mimicking an eclipse'
    }} />
    <DemoItem {...{
      ThemeToggleComponent: ThemeToggleSimple,
      title: 'Simple',
      description: 'A very basic moon and sun transition'
    }} />
  </ScToggleContainer>;
}
