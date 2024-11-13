import {
  IconBaseProps
} from '@kcuf/rc-icon-base';

import {
  ICON_TYPE_MAPPING
} from '../const';

export type TIconType = keyof typeof ICON_TYPE_MAPPING;

export interface IIconProps extends Omit<IconBaseProps, 'rotating'> {
  type: TIconType;
  colored?: boolean;
}

export interface IScIconProps {
  $type: TIconType;
  $colored?: boolean;
}
