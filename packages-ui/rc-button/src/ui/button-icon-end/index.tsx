import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/rc-button-headless';

import {
  renderIcon
} from '../../util';
import ButtonIconWrapper from '../button-icon-wrapper';

export default function ButtonIconEnd(): ReactElement | null {
  const {
    iconEnd
  } = useProps();
  const jsxIcon = renderIcon(iconEnd);
  
  return jsxIcon ? <ButtonIconWrapper>{jsxIcon}</ButtonIconWrapper> : null;
}
