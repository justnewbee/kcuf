import {
  ReactElement,
  forwardRef, useCallback, ChangeEvent
} from 'react';
import styled from 'styled-components';

import useControllable from '@kcuf-hook/use-controllable';

import {
  CSS_FORM_CONTROL_INPUT_BASE,
  HEIGHT_FORM_CONTROL
} from '../../../const';
import {
  TSelectRef,
  ISelectProps
} from '../types';

const ScSelect = styled.select`
  width: 200px;
  height: ${HEIGHT_FORM_CONTROL}px;
  ${CSS_FORM_CONTROL_INPUT_BASE}
`;

function Select({
  datasource = [],
  withEmpty = true,
  value,
  defaultValue,
  onChange,
  ...props
}: ISelectProps, ref: TSelectRef): ReactElement {
  const [controllableValue, controllableOnChange] = useControllable('', value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    controllableOnChange(e.target.value);
  }, [controllableOnChange]);
  
  return <ScSelect {...{
    ...props,
    value: controllableValue,
    ref,
    onChange: handleChange
  }}>
    {withEmpty ? <option value="">&lt;EMPTY&gt;</option> : null}
    {datasource.map(v => <option key={v.value} value={v.value}>{v.label ?? v.value}</option>)}
  </ScSelect>;
}

export default forwardRef(Select);
