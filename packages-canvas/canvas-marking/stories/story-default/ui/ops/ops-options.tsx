import {
  ReactElement
} from 'react';

import {
  Button,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useOptionEditable,
  useOptionDebugEvents,
  useHandleLoopOptionEditable,
  useHandleToggleOptionDebugEvents
} from '../../model';

export default function OpsOptions(): ReactElement {
  const optionEditable = useOptionEditable();
  const optionDebugEvents = useOptionDebugEvents();
  const handleToggleOptionEditable = useHandleLoopOptionEditable();
  const handleToggleOptionDebugEvents = useHandleToggleOptionDebugEvents();
  
  return <>
    <InputSwitch {...{
      label: 'debugEvents',
      value: optionDebugEvents,
      onChange: handleToggleOptionDebugEvents
    }} />
    <Button onClick={handleToggleOptionEditable}>editable - {optionEditable.toString()}</Button>
  </>;
}
