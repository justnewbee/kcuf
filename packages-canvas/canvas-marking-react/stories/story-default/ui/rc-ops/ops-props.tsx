import {
  ReactElement
} from 'react';

import {
  Button,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useRefImperative,
  useDebugEvents,
  useHandleToggleDebugEvents
} from '../../model';

export default function OpsProps(): ReactElement {
  const ref = useRefImperative();
  const debugEvents = useDebugEvents();
  const handleToggleDebugEvents = useHandleToggleDebugEvents();
  
  return <>
    <InputSwitch {...{
      label: 'debugEvents',
      value: debugEvents,
      onChange: handleToggleDebugEvents
    }} />
    <Button {...{
      onClick: () => console.info(ref.current?.getStats()) // eslint-disable-line no-console
    }}>getStats</Button></>;
}
