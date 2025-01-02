import {
  ReactElement
} from 'react';

import {
  Button,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useRefImperative,
  useEditable,
  useDebugEvents,
  useHandleToggleEditable,
  useHandleToggleDebugEvents
} from '../../demo-model';

export default function OpsProps(): ReactElement {
  const ref = useRefImperative();
  const editable = useEditable();
  const debugEvents = useDebugEvents();
  const handleToggleEditable = useHandleToggleEditable();
  const handleToggleDebugEvents = useHandleToggleDebugEvents();
  
  return <>
    <InputSwitch {...{
      label: 'editable',
      value: editable,
      onChange: handleToggleEditable
    }} />
    <InputSwitch {...{
      label: 'debugEvents',
      value: debugEvents,
      onChange: handleToggleDebugEvents
    }} />
    <Button {...{
      onClick: () => console.info(ref.current?.getStats()) // eslint-disable-line no-console
    }}>getStats</Button>
  </>;
}
