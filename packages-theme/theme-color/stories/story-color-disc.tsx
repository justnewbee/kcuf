import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  ColorBlock,
  ColorBlockBase,
  ColorBlockGrid
} from './rc';

const COLORS = {
  Red: 'hsl(0 100% 50%)',
  Orange: 'hsl(30 100% 50%)',
  Yellow: 'hsl(60 100% 50%)',
  Lime: 'hsl(90 100% 50%)',
  Green: 'hsl(120 100% 50%)',
  Emerald: 'hsl(150 100% 50%)',
  Cyan: 'hsl(180 100% 50%)',
  Sky: 'hsl(210 100% 50%)',
  Blue: 'hsl(240 100% 50%)',
  Indigo: 'hsl(270 100% 50%)',
  Violet: 'hsl(300 100% 50%)',
  Fuchsia: 'hsl(330 100% 50%)'
};
const COLOR_VALUES = Object.values(COLORS);

const ScColorDisc = styled.div`
  margin: 20px auto;
  width: 300px;
  height: 300px;
  background: conic-gradient(${[...COLOR_VALUES, COLORS.Red].join(', ')});
  border-radius: 50%;
`;

export default function StoryColorDisc(): ReactElement {
  return <>
    <ScColorDisc />
    <ColorBlockGrid>
      {Object.keys(COLORS).map(v => <ColorBlockBase key={v}>{v}</ColorBlockBase>)}
      {COLOR_VALUES.map(v => <ColorBlock key={v} color={v} />)}
    </ColorBlockGrid></>;
}
