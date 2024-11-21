import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useDisabled,
  useHandleToggleDisabled
} from '../../demo-model';

export default function OpsDisabled(): ReactElement {
  const disabled = useDisabled();
  const handleToggleDisabled = useHandleToggleDisabled();
  
  return <InputSwitch {...{
    label: '将无法添加和编辑',
    value: disabled,
    onChange: handleToggleDisabled
  }} />;
}
