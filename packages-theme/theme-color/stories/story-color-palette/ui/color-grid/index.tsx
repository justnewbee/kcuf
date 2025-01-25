import {
  ReactElement,
  Fragment
} from 'react';
import {
  readableColor
} from 'polished';
import styled from 'styled-components';

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
            color: readableColor(color),
            backgroundColor: color
          },
          onClick: () => setSelection([hue, lightness])
        }}>{selection?.[0] === hue && selection?.[1] === lightness ? '❍' : null}</ScColorBlock>;
      })}
    </Fragment>)}
  </ColorBlockGrid>;
}
