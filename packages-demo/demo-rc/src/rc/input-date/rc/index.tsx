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
  TInputDateRef,
  IInputDateProps
} from '../types';

const ScInputDate = styled.input`
  width: 120px;
  ${CSS_FORM_CONTROL_INPUT_BASE}
`;

function InputDate({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputDateProps, ref: TInputDateRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable<number>(0, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(fromStringToNumber(e.target.value));
  }, [controllableOnChange]);
  
  return <ScInputDate {...{
    ...props,
    value: fromNumberToString(controllableValue),
    type: 'number',
    onChange: handleChange
  }} ref={ref} />;
}

/**
 * 输入器：数字
 */
export default forwardRef(InputDate);
