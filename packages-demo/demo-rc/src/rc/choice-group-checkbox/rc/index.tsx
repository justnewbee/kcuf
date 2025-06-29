import _without from 'lodash/without';
import {
  ReactElement,
  useCallback,
  useMemo
} from 'react';

import useControllable from '@kcuf-hook/use-controllable';

import {
  TDatasourceValue
} from '../../../types';
import {
  parseDatasource
} from '../../../util';
import {
  ScChoiceGroup
} from '../../choice-group-base';
import InputCheckbox from '../../input-checkbox';
import {
  IChoiceGroupCheckboxProps
} from '../types';

export default function ChoiceGroupCheckbox<T extends TDatasourceValue = string>({
  datasource,
  value,
  defaultValue = [],
  onChange
}: IChoiceGroupCheckboxProps<T>): ReactElement | null {
  const datasourceParsed = useMemo(() => parseDatasource(datasource), [datasource]);
  const [controllableValue, setControllableValue] = useControllable([], value, defaultValue, onChange);
  
  const handleCheckboxChange = useCallback((checked: boolean, itemValue: T) => {
    const newValue = checked ? [...controllableValue, itemValue] : _without(controllableValue, itemValue);
    
    setControllableValue(newValue);
  }, [controllableValue, setControllableValue]);
  
  return <ScChoiceGroup>
    {datasourceParsed.map((v, i) => <InputCheckbox key={`${v.value}-${i}`} {...{
      label: v.label,
      value: v.value,
      checked: controllableValue.includes(v.value),
      onChange: checked => handleCheckboxChange(checked, v.value)
    }} />)}
  </ScChoiceGroup>;
}
