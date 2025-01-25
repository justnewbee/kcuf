import {
  ReactElement,
  useState
} from 'react';

import {
  InputColor,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  DarkStyle,
  ColorBlock,
  ColorBlockGrid
} from './rc';
import {
  generateColors
} from './util';

export default function StoryColorGen(): ReactElement {
  const [stateColor, setStateColor] = useState('hsl(0 100% 50%)');
  const [stateDark, setStateDark] = useState(false);
  
  return <>
    {stateDark ? <DarkStyle /> : null}
    <InputColor {...{
      withAlpha: false,
      value: stateColor,
      onChange: setStateColor
    }} />
    <InputSwitch {...{
      label: 'dark',
      value: stateDark,
      onChange: setStateDark
    }} />
    <ColorBlockGrid>
      <ColorBlock color={stateColor} dark={stateDark} />
      {generateColors(stateColor, stateDark).map(v => <ColorBlock key={v} color={v} dark={stateDark} />)}
    </ColorBlockGrid>
  </>;
}
