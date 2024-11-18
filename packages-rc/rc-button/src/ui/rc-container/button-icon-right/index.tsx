import {
  ReactElement
} from 'react';

import {
  usePropsCustom
} from '@kcuf/rc-headless-button';

import {
  renderIcon
} from '../../util';
import {
  ButtonIconWrapper
} from '../../rc';

export default function ButtonIconRight(): ReactElement | null {
  const {
    iconSpacing,
    iconRight,
    iconRightClassName
  } = usePropsCustom();
  const jsxIcon = renderIcon(iconRight);
  
  return jsxIcon ? <ButtonIconWrapper {...{
    className: iconRightClassName,
    iconSpacing
  }}>{jsxIcon}</ButtonIconWrapper> : null;
}
