import {
  ReactElement,
  forwardRef
} from 'react';

import IconBase, {
  IconBaseRef
} from '@kcuf-ui/rc-icon-base';

import {
  TIconType,
  IIconProps
} from './types';
import {
  ICON_FONT,
  ICON_TYPE_MAPPING
} from './const';
import {
  getIconCode,
  getIconColor
} from './util';

export const ICON_TYPES = Object.keys(ICON_TYPE_MAPPING) as TIconType[]; // for demo purpose

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
    rotating: type === 'loading',
    fontFamily: ICON_FONT,
    getIconCode,
    getIconColor
  }} />;
}

export default forwardRef(Icon);

export type {
  IconBaseRef as IconRef,
  IIconProps as IconProps,
  TIconType as IconType
};
