import _without from 'lodash/without';
import {
  ReactElement
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
  const datasourceParsed = parseDatasource(datasource);
  const [controllableValue, setControllableValue] = useControllable([], value, defaultValue, onChange);
  
  return <ScChoiceGroup>
    {datasourceParsed.map((v, i) => <InputCheckbox key={`${v.value as string}-${i}`} {...{
      label: v.label,
      value: v.value,
      checked: controllableValue.includes(v.value),
      onChange: checked => {
        const newValue = checked ? [...controllableValue, v.value] : _without(controllableValue, v.value);
        
        setControllableValue(newValue);
      }
    }} />)}
  </ScChoiceGroup>;
}
