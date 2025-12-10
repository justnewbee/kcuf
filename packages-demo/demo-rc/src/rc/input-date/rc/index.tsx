import {
  ReactElement,
  ChangeEvent,
  useCallback
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import {
  ScInput
} from '../../_sc-base';
import {
  IInputDateProps
} from '../types';

export default function InputDate({
  type = 'datetime',
  value,
  defaultValue,
  onChange,
  ...props
}: IInputDateProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable('', value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(e.target.value);
  }, [controllableOnChange]);
  
  return <ScInput {...{
    ...props,
    value: controllableValue,
    type: type === 'datetime' ? 'datetime-local' : type,
    onChange: handleChange
  }} />;
}
