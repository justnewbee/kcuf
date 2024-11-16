import {
  ReactElement
} from 'react';

import Icon from '@kcuf/rc-icon';
import {
  usePropsCustom
} from '@kcuf/rc-headless-button';

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
  }}>{jsxIcon}
  </ButtonIconWrapper> : null;
}
