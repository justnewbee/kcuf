import {
  ReactElement
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
  
  return <ScInput {...{
    ...props,
    value: controllableValue,
    type: type === 'datetime' ? 'datetime-local' : type,
    onChange: e => controllableOnChange(e.target.value)
  }} />;
}
