import {
  ReactElement
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  IIconBaseProps,
  IScIconBaseProps
} from '../types';
import {
  getCssIconRotation
} from '../util';

const ScIcon = styled.i<IScIconBaseProps>`
  font-family: ${props => props.$fontFamily} !important;
  ${props => props.$color ? css`
    color: ${props.$color} !important;
  ` : null}
  
  &::before {
    content: '${props => props.$code}';
    display: inline-block;
    font-size: inherit;
    font-weight: 200;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: auto;
    line-height: 1;
    vertical-align: baseline;
    -webkit-text-stroke-width: 0.2px;/* stylelint-disable-line */
    transition: all linear 200ms;
    
    ${props => getCssIconRotation(props)}
  }
`;

/**
 * ConsoleBase 项目自用的图标组件
 */
export default function IconBase<T extends string>({
  fontFamily,
  type,
  rotate,
  rotating,
  colored,
  getIconCode,
  getIconColor,
  ...props
}: IIconBaseProps<T>): ReactElement {
  const $code = getIconCode(type);
  const $color = colored && getIconColor ? getIconColor(type) : null;
  
  return <ScIcon {...{
    $fontFamily: fontFamily,
    $rotate: rotate,
    $rotating: rotating,
    $code,
    $color,
    ...props
  }} />;
}
