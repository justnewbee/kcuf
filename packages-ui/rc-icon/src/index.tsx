import {
  ReactElement,
  forwardRef
} from 'react';

import IconBase, {
  IconRef
} from '@kcuf-ui/rc-icon-base';

import {
  TIconType,
  IIconProps
} from './types';
import {
  ICON_FONT
} from './const';
import {
  getIconCode,
  getIconColor
} from './util';

/**
 * ConsoleBase 项目自用的图标组件
 */
function Icon(props: IIconProps, ref: IconRef): ReactElement {
  const {
    type,
    ...restProps
  } = props;
  
  return <IconBase<TIconType> {...{
    ...restProps,
    ref,
    type,
    rotating: type === 'loading',
    fontFamily: ICON_FONT,
    getIconCode,
    getIconColor
  }} />;
}

export default forwardRef(Icon);

export type {
  TIconType as IconType,
  IIconProps as IconProps
};
