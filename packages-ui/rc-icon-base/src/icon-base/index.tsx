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
  TIconBaseRef
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
  
  ${props => props.$darkThemePrefix && props.$colorDark ? css`
    ${props.$darkThemePrefix} & {
      color: ${props.$colorDark} !important;
    }
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
 * IconFont 图标基础组件，不是具体的图标组件，封装了写一个 Icon 组件需要的大部分逻辑
 */
function IconBase<T extends string>(props: IIconBaseProps<T>, ref: TIconBaseRef): ReactElement {
  const {
    fontFamily,
    darkThemePrefix,
    type,
    disabled,
    colored,
    rotating,
    rotate,
    scale,
    getIconCode,
    getIconColor,
    getIconColorDark,
    role,
    tabIndex,
    onClick,
    ...restProps
  } = props;
  const $code = getIconCode(type);
  const $color = colored && getIconColor ? getIconColor(type) : null;
  const $colorDark = colored && getIconColorDark ? getIconColorDark(type) : null;
  
  return <ScIcon {...{
    ref,
    $fontFamily: fontFamily,
    $code,
    $darkThemePrefix: darkThemePrefix,
    $color,
    $colorDark,
    $rotating: rotating,
    $rotate: rotate,
    $scale: scale,
    ...restProps,
    tabIndex: tabIndex ?? (onClick ? 0 : undefined),
    'aria-disabled': disabled ? 'true' : undefined,
    role: onClick && !role ? 'button' : role,
    onClick: disabled ? undefined : onClick
  }} />;
}

export default forwardRef(IconBase) as typeof IconBase;
