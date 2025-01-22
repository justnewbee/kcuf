import {
  ReactElement
} from 'react';

import Icon from '@kcuf-ui/rc-icon';
import {
  useProps
} from '@kcuf-ui/rc-button-headless';

import {
  renderIcon
} from '../../util';
import ButtonIconWrapper from '../button-icon-wrapper';

export default function ButtonIconStart(): ReactElement | null {
  const {
    loading,
    iconStart
  } = useProps();
  const jsxIcon = loading ? <Icon type="loading" /> : renderIcon(iconStart);
  
  return jsxIcon ? <ButtonIconWrapper>{jsxIcon}</ButtonIconWrapper> : null;
}
