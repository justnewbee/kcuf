import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/input-text-headless';

import {
  ScAddonSuffix
} from '../index.styled';

export default function AddonSuffix(): ReactElement | null {
  const {
    addonSuffix
  } = useProps();
  
  return addonSuffix ? <ScAddonSuffix>{addonSuffix}</ScAddonSuffix> : null;
}
