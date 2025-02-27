import {
  ReactElement
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import {
  useDestroyed,
  useHandleToggleDestroyed
} from '../../model';

export default function OpsDestroyed(): ReactElement {
  const destroyed = useDestroyed();
  const handleToggleDestroyed = useHandleToggleDestroyed();
  
  return <InputSwitch {...{
    label: '测试 init 和 destroy effects',
    value: destroyed,
    onChange: handleToggleDestroyed
  }} />;
}
