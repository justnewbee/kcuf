import {
  ReactElement
} from 'react';

import Icon from '@kcuf-ui/rc-icon';
import {
  usePropsCustom
} from '@kcuf-ui/rc-button-headless';

import {
  renderIcon
} from '../../util';
import {
  ButtonIconWrapper
} from '../../rc';

export default function ButtonIconLeft(): ReactElement | null {
  const {
    loading,
    iconSpacing,
    iconLeft,
    iconLeftClassName
  } = usePropsCustom();
  const jsxIcon = loading ? <Icon type="loading" /> : renderIcon(iconLeft);
  
  return jsxIcon ? <ButtonIconWrapper {...{
    className: iconLeftClassName,
    iconSpacing
  }}>{jsxIcon}</ButtonIconWrapper> : null;
}
