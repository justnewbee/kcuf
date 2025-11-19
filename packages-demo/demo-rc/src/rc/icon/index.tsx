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

export default function Icon({
  type,
  ...props
}: IIconProps): ReactElement {
  return <IconBase<TIconType> {...{
    ...props,
    type,
    rotating: type === 'loading',
    fontFamily: ICON_FONT,
    getIconCode,
    getIconColor
  }} />;
}

export type {
  TIconType as IconType,
  IIconProps as IconProps
};
