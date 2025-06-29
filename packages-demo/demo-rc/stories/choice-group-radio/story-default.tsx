import {
  ReactElement,
  useState
} from 'react';

import {
  DatasourceItem,
  ChoiceGroupRadio
} from '../../src';

const DATASOURCE: DatasourceItem<'s1' | 's2'>[] = [{
  value: 's1',
  label: 'check 1'
}, {
  value: 's2',
  label: 'check 2'
}];

export default function StoryDefault(): ReactElement {
  const [stateValue, setStateValue] = useState<'s1' | 's2'>('s1');
  
  return <>
    <ChoiceGroupRadio<'s1' | 's2'> {...{
      datasource: DATASOURCE,
      value: stateValue,
      onChange: setStateValue
    }} />
    <ChoiceGroupRadio<'s1' | 's2'> {...{
      datasource: ['s1', 's2'],
      value: stateValue,
      onChange: setStateValue
    }} />
  </>;
}
