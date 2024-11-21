import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useRefImperative
} from '../../demo-model';

export default function OpsDebug(): ReactElement {
  const ref = useRefImperative();
  
  return <Button {...{
    onClick: () => console.info(ref.current?.getStats()) // eslint-disable-line no-console
  }}>getStats</Button>;
}
