import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScAddonSuffix
} from '../sc';

export default function AddonAfter(): ReactElement | null {
  const {
    addonAfter
  } = useProps();
  
  return addonAfter ? <ScAddonSuffix>{addonAfter}</ScAddonSuffix> : null;
}
