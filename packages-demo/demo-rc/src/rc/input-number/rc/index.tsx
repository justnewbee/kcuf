import {
  ReactElement,
  ChangeEvent,
  useCallback
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
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(fromStringToNumber(e.target.value));
  }, [controllableOnChange]);
  
  return <ScInput {...{
    ...props,
    value: fromNumberToString(controllableValue),
    type: 'number',
    onChange: handleChange
  }} />;
}
