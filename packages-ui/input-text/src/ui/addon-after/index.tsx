import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/input-text-headless';

import {
  ScAddonSuffix
} from '../index.styled';

export default function AddonAfter(): ReactElement | null {
  const {
    addonAfter
  } = useProps();
  
  return addonAfter ? <ScAddonSuffix>{addonAfter}</ScAddonSuffix> : null;
}
