import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useCallback
} from 'react';
import styled from 'styled-components';

import {
  useControllable
} from '@kcuf/react-hook-controllable';

import {
  fromNumberToString,
  fromStringToNumber
} from '../../../util';
import {
  TInputRangeRef,
  IInputRangeProps
} from '../types';

// 不能将几个 -track 合一起写
const ScInputRange = styled.input`
  margin: 10px 0;
  background: transparent;
  height: 24px;
  appearance: none;
  
  &:focus {
    outline: none;
  }
  
  ::-moz-range-track {
    border-radius: 8px;
    background: hsl(204 77% 52%);
    width: 100%;
    height: 4px;
    cursor: default;
  }
  
  ::-webkit-slider-runnable-track {
    border-radius: 8px;
    background: hsl(204 77% 52%);
    width: 100%;
    height: 4px;
    cursor: default;
  }
  
  &::-moz-range-thumb {
    border: 1px solid hsl(204 77% 52%);
    border-radius: 25px;
    background: hsl(210 100% 82%);
    width: 18px;
    height: 18px;
    cursor: default;
  }
  
  &::-webkit-slider-thumb {
    margin-top: -7.5px;
    border: 1px solid hsl(204 77% 52%);
    border-radius: 25px;
    background: hsl(210 100% 82%);
    width: 18px;
    height: 18px;
    cursor: default;
    appearance: none;
  }
  
  &:focus::-webkit-slider-runnable-track {
    background: hsl(204 77% 52%);
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
