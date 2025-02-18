import {
  ReactElement
} from 'react';

import {
  Button
} from '@kcuf/demo-rc';

import {
  useOptionEditable,
  useHandleLoopOptionEditable
} from '../../model';

export default function OpsEditable(): ReactElement {
  const optionEditable = useOptionEditable();
  const handleToggleOptionEditable = useHandleLoopOptionEditable();
  
  return <Button onClick={handleToggleOptionEditable}>{optionEditable.toString()}</Button>;
}
