import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScAddonPrefix
} from '../sc';

export default function AddonBefore(): ReactElement | null {
  const {
    addonBefore
  } = useProps();
  
  return addonBefore ? <ScAddonPrefix>{addonBefore}</ScAddonPrefix> : null;
}
