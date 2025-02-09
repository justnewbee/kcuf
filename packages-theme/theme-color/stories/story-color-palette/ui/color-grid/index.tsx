import {
  ReactElement,
  Fragment
} from 'react';
import styled from 'styled-components';

import {
  a11yReadableColor
} from '@kcuf/mere-color';

import {
  ColorBlockBase,
  ColorBlockGrid
} from '../../../rc';
import {
  HUE_LEVELS,
  LIGHTNESS_LEVELS,
  useStateHueOffset,
  useStateSelectedHueLightness,
  useGetHslColorString
} from '../../model';

const ScColorBlock = styled(ColorBlockBase)`
  font-size: 1.2rem;
`;

export default function ColorGrid(): ReactElement {
  const [selection, setSelection] = useStateSelectedHueLightness();
  const [hueOffset] = useStateHueOffset();
  const getHslColorString = useGetHslColorString();
  
  return <ColorBlockGrid $repeat={HUE_LEVELS.length}>
    {HUE_LEVELS.map(hue => <ColorBlockBase key={hue}>{hue + hueOffset}</ColorBlockBase>)}
    {LIGHTNESS_LEVELS.map(lightness => <Fragment key={lightness}>
      {HUE_LEVELS.map(hue => {
        const color = getHslColorString(hue, lightness);
        
        return <ScColorBlock key={hue} {...{
          style: {
            color: a11yReadableColor(color),
            backgroundColor: color
          },
          onClick: () => setSelection([hue, lightness])
        }}>{selection?.[0] === hue && selection?.[1] === lightness ? '❍' : null}</ScColorBlock>;
      })}
    </Fragment>)}
  </ColorBlockGrid>;
}
