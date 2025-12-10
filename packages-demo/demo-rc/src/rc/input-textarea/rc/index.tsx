import {
  ReactElement,
  ChangeEvent,
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
  IInputTextareaProps
} from '../types';

const ScInputTextarea = styled.textarea`
  ${CSS_FORM_CONTROL_INPUT_TEXTAREA}
`;

export default function InputTextarea({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputTextareaProps): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableSoftTrim(true, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => controllableOnChange(e.target.value), [controllableOnChange]);
  
  return <ScInputTextarea {...{
    ...props,
    value: controllableValue,
    onChange: handleChange
  }} />;
}
