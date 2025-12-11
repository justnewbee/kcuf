import {
  ReactElement
} from 'react';

import IconBase from '@kcuf-ui/icon-base';

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
  IIconProps as IconProps,
  TIconType as IconType
};
