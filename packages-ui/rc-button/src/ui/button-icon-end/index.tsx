import {
  ReactElement
} from 'react';

import {
  usePropsCustom
} from '@kcuf-ui/rc-button-headless';

import {
  renderIcon
} from '../../util';
import ButtonIconWrapper from '../button-icon-wrapper';

export default function ButtonIconEnd(): ReactElement | null {
  const {
    iconSpacing,
    iconEnd
  } = usePropsCustom();
  const jsxIcon = renderIcon(iconEnd);
  
  return jsxIcon ? <ButtonIconWrapper {...{
    iconSpacing
  }}>{jsxIcon}</ButtonIconWrapper> : null;
}
