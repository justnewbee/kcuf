import {
  ReactElement
} from 'react';

import IconBase from '@kcuf-ui/icon-base';

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

export default function Icon(props: IIconProps): ReactElement {
  return <IconBase<TIconType> {...{
    rotating: props.type === 'loading',
    ...props,
    fontFamily: ICON_FONT,
    getIconCode,
    getIconColor
  }} />;
}

export type {
  TIconType as IconType,
  IIconProps as IconProps
};
