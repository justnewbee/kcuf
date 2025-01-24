import {
  ReactElement,
  Fragment
} from 'react';
import {
  readableColor
} from 'polished';
import styled from 'styled-components';

import {
  HUE_LEVELS,
  LIGHTNESS_LEVELS,
  useStateHueOffset,
  useStateSelectedHueLightness,
  useGetHslColorString
} from '../../model';

const ScColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${HUE_LEVELS.length}, 1fr);
  gap: 4px;
  margin: 8px 0;
`;

const ScColorBlockBase = styled.div`
  height: 30px;
  border-radius: 2px;
  text-align: center;
  line-height: 30px;
  cursor: default;
  transition: all 100ms ease;
`;

const ScColorBlock = styled(ScColorBlockBase)`
  font-size: 1.2rem;
`;

export default function ColorGrid(): ReactElement {
  const [selection, setSelection] = useStateSelectedHueLightness();
  const [hueOffset] = useStateHueOffset();
  const getHslColorString = useGetHslColorString();
  
  return <ScColorGrid>
    {HUE_LEVELS.map(hue => <ScColorBlockBase key={hue}>{hue + hueOffset}</ScColorBlockBase>)}
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
  </ScColorGrid>;
}
