import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import IconBase, {
  injectIconFont
} from '@kcuf/rc-icon-base';

import {
  ICON_TYPE_MAPPING
} from './const';

import {
  TIconType,
  IIconProps,
  IScIconProps
} from './types';
import {
  getIconColor
} from './util';

// https://at.alicdn.com/t/c/font_4720928_yvtln3fv7v.css
const fontFamily = injectIconFont('4720928', 'yvtln3fv7v', {
  pathExtra: '/c'
});

const ScIcon = styled(IconBase)<IScIconProps>`
  font-family: ${fontFamily} !important;
  color: ${props => getIconColor(props)};
  
  &::before {
    content: '${props => `\\${ICON_TYPE_MAPPING[props.$type] || 'e600'}`}';
  }
`;

/**
 * ConsoleBase 项目自用的图标组件
 */
export default function Icon({
  type,
  colored,
  ...props
}: IIconProps): ReactElement {
  return <ScIcon {...{
    ...props,
    $type: type,
    $colored: colored,
    rotating: type === 'loading'
  }} />;
}

export type {
  TIconType as IconType,
  IIconProps as IconProps
};
