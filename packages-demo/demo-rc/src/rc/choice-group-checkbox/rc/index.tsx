import _without from 'lodash/without';
import {
  ReactElement,
  ChangeEvent,
  useCallback
} from 'react';

import useControllable from '@kcuf/react-hook-controllable';

import {
  ScChoiceGroup,
  ScChoiceGroupItem,
  ScChoiceGroupItemLabel
} from '../../choice-group-base';
import {
  IChoiceGroupCheckboxProps
} from '../types';

export default function ChoiceGroupCheckbox<T>({
  dataSource,
  value,
  defaultValue = [],
  onChange
}: IChoiceGroupCheckboxProps<T>): ReactElement | null {
  const [controllableValue, setControllableValue] = useControllable([], value, defaultValue, onChange);
  
  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>, itemValue: T) => {
    const newValue = e.target.checked ? [...controllableValue, itemValue] : _without(controllableValue, itemValue);
    
    setControllableValue(newValue);
  }, [controllableValue, setControllableValue]);
  
  return <ScChoiceGroup>
    {dataSource.map((v, i) => <ScChoiceGroupItem key={`${v.value}-${i}`}>
      <input {...{
        type: 'checkbox',
        checked: controllableValue.includes(v.value),
        onChange: e => handleCheckboxChange(e, v.value)
      }} />
      <ScChoiceGroupItemLabel>{v.label}</ScChoiceGroupItemLabel>
    </ScChoiceGroupItem>)}
  </ScChoiceGroup>;
}
