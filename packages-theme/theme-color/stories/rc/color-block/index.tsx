import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  parseToRgb,
  toStringHex,
  toStringHsl,
  a11yReadableColor
} from '@kcuf/mere-color';

import {
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
  const transparent = rgb ? rgb.a !== undefined : false;
  
  return <ScColorBlock {...{
    $transparent: transparent,
    style: text ? {
      color
    } : {
      backgroundColor: color,
      color: a11yReadableColor(color, {
        whenBgDark: transparent ? 'hsl(330 100% 60%)' : undefined
      })
    }
  }}>
    <div>{toStringHsl(color).replace(/hsl\(|\)/g, '')}</div>
    <div>{toStringHex(color)}</div>
    {transparent ? null : <div>{getContrastLabel(color, dark)}</div>}
  </ScColorBlock>;
}
