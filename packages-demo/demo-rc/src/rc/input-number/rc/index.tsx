import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import useControllable from '@kcuf-hook/use-controllable';

import {
  CSS_FORM_CONTROL_INPUT_BASE
} from '../../../const';
import {
  fromNumberToString,
  fromStringToNumber
} from '../../../util';
import {
  TInputNumberRef,
  IInputNumberProps
} from '../types';

const ScInputNumber = styled.input`
  width: 120px;
  ${CSS_FORM_CONTROL_INPUT_BASE}
`;

function InputNumber({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputNumberProps, ref: TInputNumberRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable<number>(0, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(fromStringToNumber(e.target.value));
  }, [controllableOnChange]);
  
  return <ScInputNumber
    {...{
      ...props,
      value: fromNumberToString(controllableValue),
      type: 'number',
      onChange: handleChange
    }}
    ref={ref} />;
}

/**
 * 输入器：数字
 */
export default forwardRef(InputNumber);
