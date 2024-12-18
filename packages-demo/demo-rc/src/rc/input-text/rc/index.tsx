import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';
import styled, {
  css
} from 'styled-components';

import {
  useControllableSoftTrim
} from '@kcuf/react-hook-controllable';

import {
  CSS_FORM_CONTROL_INPUT_BASE
} from '../../../const';
import {
  TInputTextRef,
  IInputTextProps
} from '../types';

interface IScInput {
  $block?: boolean;
}

const ScInputText = styled.input<IScInput>`
  min-width: 240px;
  max-width: 100%;
  ${CSS_FORM_CONTROL_INPUT_BASE}
  ${props => (props.$block ? css`
    margin: 1px 0 1px 0;
    display: block;
    width: 100%;
  ` : null)}
`;

function InputText({
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
  
  return <ScInputText {...{
    $block: block,
    ...props,
    value: controllableValue,
    type: 'text',
    ref,
    onChange: handleChange
  }} />;
}

export default forwardRef(InputText);
