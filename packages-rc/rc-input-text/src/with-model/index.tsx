import {
  ReactElement
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf/react-hook-controllable';
import Model, {
  InputTextProps
} from '@kcuf/rc-input-text-headless';

import Ui from '../ui';

export default function WithProvider({
  trim = true,
  value,
  defaultValue,
  onChange,
  ...props
}: InputTextProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(trim, value, defaultValue, onChange);
  
  return <Model {...{
    ...props,
    value: controllableValue,
    onChange: controllableOnChange
  }}>
    <Ui />
  </Model>;
}
