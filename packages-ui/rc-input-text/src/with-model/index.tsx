import {
  ReactElement
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';
import InputTextHeadless, {
  InputTextProps
} from '@kcuf-ui/rc-input-text-headless';

import Ui from '../ui';

export default function WithProvider({
  trim = true,
  value,
  defaultValue,
  onChange,
  ...props
}: InputTextProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(trim, value, defaultValue, onChange);
  
  return <InputTextHeadless {...{
    ...props,
    value: controllableValue,
    onChange: controllableOnChange
  }}>
    <Ui />
  </InputTextHeadless>;
}
