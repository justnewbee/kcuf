import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useMemo
} from 'react';
import styled from 'styled-components';

import {
  useControllableUnprotected
} from '@kcuf-hook/use-controllable';

import {
  TDatasourceValue
} from '../../../types';
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

export default function Select<T extends TDatasourceValue = string>({
  datasource,
  withEmpty = true,
  value,
  defaultValue,
  onChange,
  ...props
}: ISelectProps<T>): ReactElement {
  const datasourceParsed = useMemo(() => parseDatasource(datasource), [datasource]);
  const [controllableValue, controllableOnChange] = useControllableUnprotected<T | undefined>(value, defaultValue, onChange);
  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    controllableOnChange(datasourceParsed.find(v => String(v.value) === e.target.value)?.value);
  }, [controllableOnChange, datasourceParsed]);
  
  return <ScSelect {...{
    ...props,
    value: String(controllableValue),
    onChange: handleChange
  }}>
    {withEmpty ? <option value="<EMPTY>">&lt;EMPTY&gt;</option> : null}
    {datasourceParsed.map(v => <option key={String(v.value)} value={String(v.value)}>{v.label ?? v.value}</option>)}
  </ScSelect>;
}
