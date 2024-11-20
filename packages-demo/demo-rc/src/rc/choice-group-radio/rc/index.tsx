import {
  ReactElement,
  useCallback
} from 'react';

import {
  useControllableUnprotected
} from '@kcuf/react-hook-controllable';

import {
  ScChoiceGroup
} from '../../choice-group-base';
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
  
  const handleRadioChange = useCallback((_checked: boolean, itemValue: T) => {
    setControllableValue(itemValue);
  }, [setControllableValue]);
  
  return <ScChoiceGroup>
    {datasource.map((v, i) => <InputRadio key={`${v.value}-${i}`} {...{
      label: v.label,
      checked: controllableValue === v.value,
      onChange: checked => handleRadioChange(checked, v.value)
    }} />)}
  </ScChoiceGroup>;
}
