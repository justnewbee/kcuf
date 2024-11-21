import {
  IconProps
} from '@kcuf/rc-icon-base';

import {
  ICON_TYPE_MAPPING
} from '../const';

export type TIconType = keyof typeof ICON_TYPE_MAPPING;

export interface IIconProps extends IconProps<TIconType> {}
