import {
  ReactElement
} from 'react';

import {
  useControllableUnprotected
} from '@kcuf-hook/use-controllable';

import {
  TDatasourceValue
} from '../../../types';
import {
  parseDatasource
} from '../../../util';
import {
  ScChoiceGroup
} from '../../choice-group-base';
import InputRadio from '../../input-radio';
import {
  IChoiceGroupRadioProps
} from '../types';

export default function ChoiceGroupRadio<T extends TDatasourceValue = string>({
  datasource,
  value,
  defaultValue,
  onChange
}: IChoiceGroupRadioProps<T>): ReactElement {
  const datasourceParsed = parseDatasource(datasource);
  const [controllableValue, setControllableValue] = useControllableUnprotected<T>(value, defaultValue, onChange);
  
  const handleRadioChange = (_checked: boolean, itemValue: T): void => {
    setControllableValue(itemValue);
  };
  
  return <ScChoiceGroup>
    {datasourceParsed.map((v, i) => <InputRadio key={`${v.value as string}-${i}`} {...{
      label: v.label,
      checked: controllableValue === v.value,
      onChange: checked => handleRadioChange(checked, v.value)
    }} />)}
  </ScChoiceGroup>;
}
