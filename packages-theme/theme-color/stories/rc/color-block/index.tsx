import {
  ReactElement
} from 'react';
import styled from 'styled-components';
import {
  readableColor,
  parseToRgb,
  toColorString
} from 'polished';

import {
  hslUnwrap,
  getContrastLabel
} from '../../util';
import ColorBlockBase from '../color-block-base';

interface IProps {
  color: string;
  text?: boolean;
  dark?: boolean;
  transparent?: boolean;
}

const ScContrast = styled.div`
  margin-top: 4px;
`;

export default function ColorBlockItem({
  color,
  text,
  dark
}: IProps): ReactElement {
  const rgb = parseToRgb(color);
  const alpha = 'alpha' in rgb ? rgb.alpha : 1;
  const transparent = alpha < 1;
  
  return <ColorBlockBase {...{
    $transparent: transparent,
    style: text ? {
      color
    } : {
      backgroundColor: color,
      color: readableColor(color, undefined, transparent ? 'hsl(330 100% 60%)' : undefined)
    }
  }}>
    <div>{hslUnwrap(color)}</div>
    <div>{toColorString(parseToRgb(color))}</div>
    {transparent ? null : <ScContrast>{getContrastLabel(color, dark)}</ScContrast>}
  </ColorBlockBase>;
}
