import {
  ReactElement,
  forwardRef
} from 'react';
import styled from 'styled-components';

import {
  CSS_FORM_CONTROL_INPUT_BASE,
  HEIGHT_FORM_CONTROL
} from '../../../const';
import {
  TSelectRef,
  ISelectProps
} from '../types';

const ScSelect = styled.select`
  height: ${HEIGHT_FORM_CONTROL}px;
  min-width: 120px;
  max-width: 100%;
  
  ${CSS_FORM_CONTROL_INPUT_BASE}
`;

function Select({
  datasource = [],
  ...props
}: ISelectProps, ref: TSelectRef): ReactElement {
  return <ScSelect {...props} ref={ref}>
    {datasource.map(v => <option key={v.value} value={v.value}>{v.label ?? v.value}</option>)}
  </ScSelect>;
}

export default forwardRef(Select);
