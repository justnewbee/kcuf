import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScAddonPrefix
} from '../sc';

export default function AddonPrefix(): ReactElement | null {
  const {
    addonPrefix
  } = useProps();
  
  return addonPrefix ? <ScAddonPrefix>{addonPrefix}</ScAddonPrefix> : null;
}
