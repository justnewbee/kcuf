import {
  ReactElement,
  ChangeEvent,
  useCallback
} from 'react';

import {
  useControllableUnprotected
} from '@kcuf/react-hook-controllable';

import {
  ScChoiceGroup,
  ScChoiceGroupItem,
  ScChoiceGroupItemLabel
} from '../../choice-group-base';
import {
  IChoiceGroupRadioProps
} from '../types';

export default function ChoiceGroupRadio<T>({
  dataSource,
  value,
  defaultValue,
  onChange
}: IChoiceGroupRadioProps<T>): ReactElement {
  const [controllableValue, setControllableValue] = useControllableUnprotected<T>(value, defaultValue, onChange);
  
  const handleRadioChange = useCallback((_e: ChangeEvent<HTMLInputElement>, itemValue: T) => {
    setControllableValue(itemValue);
  }, [setControllableValue]);
  
  return <ScChoiceGroup>
    {dataSource.map((v, i) => <ScChoiceGroupItem key={`${v.value}-${i}`}>
      <input {...{
        type: 'radio',
        checked: controllableValue === v.value,
        onChange: e => handleRadioChange(e, v.value)
      }} />
      <ScChoiceGroupItemLabel>{v.label}</ScChoiceGroupItemLabel>
    </ScChoiceGroupItem>)}
  </ScChoiceGroup>;
}
