import {
  ReactElement
} from 'react';

import {
  useCountInfo
} from '@kcuf-ui/rc-input-text-headless';

import {
  ScAddonSuffix
} from '../sc';

export default function Count(): ReactElement | null {
  const countInfo = useCountInfo();
  
  return countInfo ? <ScAddonSuffix>
    {countInfo}
  </ScAddonSuffix> : null;
}
