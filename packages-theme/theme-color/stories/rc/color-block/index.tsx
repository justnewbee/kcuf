import {
  ReactElement
} from 'react';
import styled from 'styled-components';
import {
  parseToRgb,
  toColorString
} from 'polished';

import {
  getReadableColor
} from '@kcuf/mere-color';

import {
  hslUnwrap,
  getContrastLabel
} from '../../util';
import ColorBlockBase from '../color-block-base';

interface IProps {
  color: string;
  text?: boolean;
  dark?: boolean;
}

const ScColorBlock = styled(ColorBlockBase)`
  padding-block: 8px;
`;

export default function ColorBlock({
  color,
  text,
  dark
}: IProps): ReactElement {
  const rgb = parseToRgb(color);
  const alpha = 'alpha' in rgb ? rgb.alpha : 1;
  const transparent = alpha < 1;
  
  return <ScColorBlock {...{
    $transparent: transparent,
    style: text ? {
      color
    } : {
      backgroundColor: color,
      color: getReadableColor(color, {
        whenBgDark: transparent ? 'hsl(330 100% 60%)' : undefined
      })
    }
  }}>
    <div>{hslUnwrap(color)}</div>
    <div>{toColorString(parseToRgb(color))}</div>
    {transparent ? null : <div>{getContrastLabel(color, dark)}</div>}
  </ScColorBlock>;
}
