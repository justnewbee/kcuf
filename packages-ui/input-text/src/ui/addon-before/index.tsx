import {
  ReactElement
} from 'react';

import {
  useProps
} from '@kcuf-ui/input-text-headless';

import {
  ScAddonPrefix
} from '../index.styled';

export default function AddonBefore(): ReactElement | null {
  const {
    addonBefore
  } = useProps();
  
  return addonBefore ? <ScAddonPrefix>{addonBefore}</ScAddonPrefix> : null;
}
