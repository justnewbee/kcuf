import {
  ReactElement,
  forwardRef
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  IIconBaseProps,
  IScIconBaseProps,
  TIconRef
} from '../types';
import {
  getCssIconRotation
} from '../util';

const ScIcon = styled.i<IScIconBaseProps>`
  font-family: ${props => props.$fontFamily} !important;
  ${props => props.$color ? css`
    color: ${props.$color} !important;
  ` : null}
  ${props => props.onClick ? css`
    cursor: pointer;
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
    -webkit-text-stroke-width: 0.2px; /* stylelint-disable-line */
    transition: all linear 200ms;
    ${props => getCssIconRotation(props)}
  }
  
  &[aria-disabled='true'] {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

/**
 * ConsoleBase 项目自用的图标组件
 */
function IconBase<T extends string>({
  fontFamily,
  type,
  disabled,
  colored,
  rotating,
  rotate,
  scale,
  getIconCode,
  getIconColor,
  role,
  onClick,
  ...props
}: IIconBaseProps<T>, ref: TIconRef): ReactElement {
  const $code = getIconCode(type);
  const $color = colored && getIconColor ? getIconColor(type) : null;
  
  return <ScIcon {...{
    ref,
    $fontFamily: fontFamily,
    $code,
    $color,
    $rotating: rotating,
    $rotate: rotate,
    $scale: scale,
    ...props,
    'aria-disabled': disabled ? 'true' : undefined,
    role: onClick && !role ? 'button' : role,
    onClick: disabled ? undefined : onClick
  }} />;
}

export default forwardRef(IconBase) as typeof IconBase;
