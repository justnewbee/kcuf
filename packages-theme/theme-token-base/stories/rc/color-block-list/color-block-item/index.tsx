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
  Hsl,
  Hsla
} from '../../../../src';
import {
  hslUnwrap,
  getContrastLabel
} from '../../../util';
import {
  ScColorBlock
} from '../../../sc';

interface IProps {
  color: Hsl | Hsla;
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
  transparent,
  dark
}: IProps): ReactElement {
  return <ScColorBlock {...{
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
  </ScColorBlock>;
}
