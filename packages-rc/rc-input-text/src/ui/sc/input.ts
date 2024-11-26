import styled from 'styled-components';

import {
  SIZE
} from '@kcuf/fork-console-base-theme';
import {
  InputTextProps
} from '@kcuf/rc-input-text-headless';

import {
  getStyledBorder,
  getStyledShadow
} from '../util';

export default styled.div<InputTextProps>`
  display: ${props => props.block ? 'flex' : 'inline-flex'};
  align-items: center;
  position: relative;
  height: ${SIZE.HEIGHT_FORM_CONTROL_M}px;
  border: 1px solid transparent;
  border-radius: ${props => props.round ? `${SIZE.HEIGHT_FORM_CONTROL_M}px` : 'none'};
  box-sizing: border-box;
  font-size: ${SIZE.FONT_SIZE_BODY}px;
  transition: all 0.3s ease-out;
  ${getStyledBorder}
  ${getStyledShadow}
`;
