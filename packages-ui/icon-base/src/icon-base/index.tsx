import {
  ReactElement
} from 'react';

import {
  IIconBaseProps
} from '../types';

import {
  ScIcon
} from './index.styled';

/**
 * IconFont 图标基础组件，不是具体的图标组件，封装了写一个 Icon 组件需要的大部分逻辑
 */
export default function IconBase<T extends string>({
  fontFamily,
  darkThemePrefix,
  type,
  block,
  size,
  sizeRelative,
  spacing,
  disabled,
  colored,
  rotating,
  rotate,
  scale,
  eyeCatching,
  getIconCode,
  getIconColor,
  getIconColorDark,
  role,
  tabIndex,
  onClick,
  ...props
}: IIconBaseProps<T>): ReactElement {
  const $code = getIconCode(type);
  const $color = colored && getIconColor ? getIconColor(type) : null;
  const $colorDark = colored && getIconColorDark ? getIconColorDark(type) : null;
  
  return <ScIcon {...{
    $fontFamily: fontFamily,
    $code,
    $darkThemePrefix: darkThemePrefix,
    $color,
    $colorDark,
    $rotating: rotating,
    $rotate: rotate,
    $scale: scale,
    ...props,
    'data-icon-type': type, // for inspection only
    'data-icon-block': block ? '' : undefined,
    'data-icon-size': size ? `${size}${sizeRelative ? '-relative' : ''}` : undefined,
    'data-icon-spacing': spacing,
    'data-icon-pulsing': eyeCatching ? '' : undefined,
    tabIndex: tabIndex ?? (onClick ? 0 : undefined),
    'aria-disabled': disabled ? 'true' : undefined,
    role: onClick && !role ? 'button' : role,
    onClick: disabled ? undefined : onClick
  }} />;
}
