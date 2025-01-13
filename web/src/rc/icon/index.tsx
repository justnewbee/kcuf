import {
  ReactElement,
  forwardRef
} from 'react';
import {
  IconBase,
  IconBaseRef
} from 'kcuf-ui';

import {
  TIconType,
  IIconProps
} from './types';
import {
  ICON_FONT
} from './const';
import {
  getIconCode,
  getIconColor,
  getIconColorDark
} from './util';

/**
 * ConsoleBase 项目自用的图标组件
 */
function Icon(props: IIconProps, ref: IconBaseRef): ReactElement {
  const {
    type,
    ...restProps
  } = props;
  
  return <IconBase<TIconType> {...{
    ...restProps,
    ref,
    type,
    fontFamily: ICON_FONT,
    darkThemePrefix: 'html[data-theme="dark"]',
    getIconCode,
    getIconColor,
    getIconColorDark
  }} />;
}

export default forwardRef(Icon);

export type {
  IconBaseRef as IconRef,
  IIconProps as IconProps,
  TIconType as IconType
};
