import {
  ReactElement
} from 'react';

import {
  useControllableUnprotected
} from '@kcuf-hook/use-controllable';

import {
  parseDatasource
} from '../../../util';
import {
  ScChoiceGroup
} from '../../index.styled';
import InputRadio from '../../input-radio';
import {
  IChoiceGroupRadioProps
} from '../types';

export default function ChoiceGroupRadio<T>({
  datasource,
  value,
  defaultValue,
  onChange
}: IChoiceGroupRadioProps<T>): ReactElement {
  const [controllableValue, setControllableValue] = useControllableUnprotected<T>(value, defaultValue, onChange);
  
  return <ScChoiceGroup>
    {parseDatasource(datasource).map((v, i) => <InputRadio key={`${v.value as string}-${i}`} {...{
      label: v.label,
      checked: controllableValue === v.value,
      onChange: () => setControllableValue(v.value)
    }} />)}
  </ScChoiceGroup>;
}
