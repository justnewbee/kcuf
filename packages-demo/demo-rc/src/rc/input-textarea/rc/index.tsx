import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  useControllableSoftTrim
} from '@kcuf-hook/use-controllable';

import {
  CSS_FORM_CONTROL_INPUT_TEXTAREA
} from '../../../const';
import {
  TInputTextareaRef,
  IInputTextareaProps
} from '../types';

const ScInputTextarea = styled.textarea`
  ${CSS_FORM_CONTROL_INPUT_TEXTAREA}
`;

function InputTextarea({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputTextareaProps, ref: TInputTextareaRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(true, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => controllableOnChange(e.target.value), [controllableOnChange]);
  
  return <ScInputTextarea {...{
    ...props,
    ref,
    value: controllableValue,
    onChange: handleChange
  }} />;
}

export default forwardRef(InputTextarea);
