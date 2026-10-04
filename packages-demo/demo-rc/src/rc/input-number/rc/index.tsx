import {
  ReactElement
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import {
  fromNumberToString,
  fromStringToNumber
} from '../../../util';
import {
  ScInput
} from '../../_sc-base';
import {
  IInputNumberProps
} from '../types';

export default function InputNumber({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputNumberProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable<number>(0, value, defaultValue, onChange);
  
  return <ScInput {...{
    ...props,
    value: fromNumberToString(controllableValue),
    type: 'number',
    onChange: e => controllableOnChange(fromStringToNumber(e.target.value))
  }} />;
}
