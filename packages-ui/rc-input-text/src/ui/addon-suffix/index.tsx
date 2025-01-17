import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScAddonSuffix
} from '../sc';

export default function AddonSuffix(): ReactElement | null {
  const {
    addonSuffix
  } = useProps();
  
  return addonSuffix ? <ScAddonSuffix>{addonSuffix}</ScAddonSuffix> : null;
}
