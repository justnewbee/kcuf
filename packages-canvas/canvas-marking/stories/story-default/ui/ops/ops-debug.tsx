import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useOptionDebugEvents,
  useHandleToggleOptionDebugEvents
} from '../../model';

export default function OpsDebug(): ReactElement {
  const optionDebugEvents = useOptionDebugEvents();
  const handleToggleOptionDebugEvents = useHandleToggleOptionDebugEvents();
  
  return <InputSwitch {...{
    label: 'debugEvents',
    value: optionDebugEvents,
    onChange: handleToggleOptionDebugEvents
  }} />;
}
