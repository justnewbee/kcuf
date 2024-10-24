import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import IconBase, {
  IconBaseProps,
  injectIconFont
} from '@kcuf/rc-icon-base';

import {
  ICON_TYPE_MAPPING
} from './const';

type TIconType = keyof typeof ICON_TYPE_MAPPING;

interface IIconProps extends Omit<IconBaseProps, 'rotating'> {
  type: TIconType;
}

interface IScIconProps {
  $type: TIconType;
}

// https://at.alicdn.com/t/c/font_4720928_yvtln3fv7v.css
const fontFamily = injectIconFont('4720928', 'yvtln3fv7v', {
  pathExtra: '/c'
});

const ScIcon = styled(IconBase)<IScIconProps>`
  font-family: ${fontFamily} !important;
  
  &::before {
    content: '${props => `\\${ICON_TYPE_MAPPING[props.$type] || 'e600'}`}';
  }
`;

/**
 * ConsoleBase 项目自用的图标组件
 */
export default function Icon({
  type,
  ...props
}: IIconProps): ReactElement {
  return <ScIcon {...{
    ...props,
    $type: type,
    rotating: type === 'loading'
  }} />;
}

export type {
  TIconType as IconType,
  IIconProps as IconProps
};
