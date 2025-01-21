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
import ButtonIconWrapper from '../button-icon-wrapper';

export default function ButtonIconStart(): ReactElement | null {
  const {
    loading,
    iconSpacing,
    iconStart
  } = usePropsCustom();
  const jsxIcon = loading ? <Icon type="loading" /> : renderIcon(iconStart);
  
  return jsxIcon ? <ButtonIconWrapper {...{
    iconSpacing
  }}>{jsxIcon}</ButtonIconWrapper> : null;
}
