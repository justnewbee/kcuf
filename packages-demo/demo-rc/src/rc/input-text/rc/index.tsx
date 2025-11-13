import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  ScInput
} from '../../_sc-base';
import {
  TInputTextRef,
  IInputTextProps
} from '../types';

export default forwardRef(function InputText({
  block,
  value,
  defaultValue,
  onChange,
  ...props
}: IInputTextProps, ref: TInputTextRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(true, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(e.target.value);
  }, [controllableOnChange]);
  
  return <ScInput {...{
    $block: block,
    ...props,
    value: controllableValue,
    type: 'text',
    ref,
    onChange: handleChange
  }} />;
});
