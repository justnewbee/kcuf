import {
  ReactElement
} from 'react';
import styled from 'styled-components';

import {
  useControllableUnprotected
} from '@kcuf-hook/use-controllable';

import {
  CSS_FORM_CONTROL_INPUT_BASE,
  HEIGHT_FORM_CONTROL
} from '../../../const';
import {
  parseDatasource
} from '../../../util';
import {
  ISelectProps
} from '../types';

const ScSelect = styled.select`
  width: 200px;
  height: ${HEIGHT_FORM_CONTROL}px;
  ${CSS_FORM_CONTROL_INPUT_BASE}
`;

export default function Select<T = string>({
  datasource,
  withEmpty = true,
  value,
  defaultValue,
  onChange,
  ...props
}: ISelectProps<T>): ReactElement {
  const [controllableValue, controllableOnChange] = useControllableUnprotected<T | undefined>(value, defaultValue, onChange);
  
  const datasourceParsed = parseDatasource(datasource);
  
  return <ScSelect {...{
    ...props,
    value: String(controllableValue),
    onChange: e => controllableOnChange(datasourceParsed.find(v => String(v.value) === e.target.value)?.value)
  }}>
    {withEmpty ? <option value="<EMPTY>">&lt;EMPTY&gt;</option> : null}
    {datasourceParsed.map(v => <option key={String(v.value)} value={String(v.value)}>{v.label ?? String(v.value)}</option>)}
  </ScSelect>;
}
