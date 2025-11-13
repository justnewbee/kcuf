import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import {
  ScInput
} from '../../_sc-base';
import {
  TInputDateRef,
  IInputDateProps
} from '../types';

export default forwardRef(function InputDate({
  type = 'datetime',
  value,
  defaultValue,
  onChange,
  ...props
}: IInputDateProps, ref: TInputDateRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable('', value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(e.target.value);
  }, [controllableOnChange]);
  
  return <ScInput {...{
    ...props,
    value: controllableValue,
    type: type === 'datetime' ? 'datetime-local' : type,
    onChange: handleChange
  }} ref={ref} />;
});
