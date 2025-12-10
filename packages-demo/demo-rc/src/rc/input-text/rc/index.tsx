import {
  ReactElement,
  ChangeEvent,
  useCallback
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  ScInput
} from '../../_sc-base';
import {
  IInputTextProps
} from '../types';

export default function InputText({
  block,
  value,
  defaultValue,
  onChange,
  ...props
}: IInputTextProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(true, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(e.target.value);
  }, [controllableOnChange]);
  
  return <ScInput {...{
    $block: block,
    ...props,
    value: controllableValue,
    type: 'text',
    onChange: handleChange
  }} />;
}
