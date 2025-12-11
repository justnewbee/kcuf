import {
  ReactElement
} from 'react';
import {
  IconBase
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

export default function Icon(props: IIconProps): ReactElement {
  return <IconBase<TIconType> {...{
    ...props,
    fontFamily: ICON_FONT,
    darkThemePrefix: 'html[data-theme="dark"]',
    getIconCode,
    getIconColor,
    getIconColorDark
  }} />;
}

export type {
  IIconProps as IconProps,
  TIconType as IconType
};
