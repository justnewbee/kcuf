import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import useControllable from '@kcuf/react-hook-controllable';

import {
  fromNumberToString,
  fromStringToNumber
} from '../../../util';
import {
  TInputRangeRef,
  IInputRangeProps
} from '../types';

// 不能将几个选择器合一起写，会不生效，只能冗余一份
const ScInputRange = styled.input`
  margin: 2px 1px;
  width: 100%;
  height: 24px;
  appearance: none;
  
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    background: #2497e3;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  
  &::-moz-range-track {
    width: 100%;
    height: 5px;
    background: #2497e3;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
  }
  
  &::-webkit-slider-thumb {
    margin-top: -6.5px;
    width: 17px;
    height: 17px;
    appearance: none;
    background: #a1d0ff;
    border: 1px solid #2497e3;
    border-radius: 17px;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 17px;
    height: 17px;
    background: #a1d0ff;
    border: 1px solid #2497e3;
    border-radius: 17px;
    cursor: pointer;
  }
  
  &:focus {
    outline: none;
  }
  
  &:focus::-webkit-slider-runnable-track {
    background: #2497e3;
  }
`;

function InputRange({
  value,
  defaultValue,
  onChange,
  ...props
}: IInputRangeProps, ref: TInputRangeRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable<number>(0, value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    controllableOnChange(fromStringToNumber(e.target.value));
  }, [controllableOnChange]);
  
  return <ScInputRange {...{
    title: `${controllableValue}`,
    ...props,
    value: fromNumberToString(controllableValue),
    type: 'range',
    onChange: handleChange
  }} ref={ref} />;
}

export default forwardRef(InputRange);
