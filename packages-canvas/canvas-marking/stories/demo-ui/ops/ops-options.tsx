import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useOptionEditable,
  useOptionDebugEvents,
  useHandleToggleOptionEditable,
  useHandleToggleOptionDebugEvents
} from '../../demo-model';

export default function OpsOptions(): ReactElement {
  const optionEditable = useOptionEditable();
  const optionDebugEvents = useOptionDebugEvents();
  const handleToggleOptionEditable = useHandleToggleOptionEditable();
  const handleToggleOptionDebugEvents = useHandleToggleOptionDebugEvents();
  
  return <>
    <InputSwitch {...{
      label: 'editable',
      value: optionEditable,
      onChange: handleToggleOptionEditable
    }} />
    <InputSwitch {...{
      label: 'debugEvents',
      value: optionDebugEvents,
      onChange: handleToggleOptionDebugEvents
    }} />
  </>;
}
