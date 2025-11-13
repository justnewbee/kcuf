import {
  ReactElement,
  ChangeEvent,
  forwardRef,
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
  TInputNumberRef,
  IInputNumberProps
} from '../types';

export default forwardRef(function InputNumber({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputNumberProps, ref: TInputNumberRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable<number>(0, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(fromStringToNumber(e.target.value));
  }, [controllableOnChange]);
  
  return <ScInput {...{
    ...props,
    value: fromNumberToString(controllableValue),
    type: 'number',
    onChange: handleChange
  }} ref={ref} />;
});
