import {
  ReactElement,
  useState
} from 'react';

import {
  ChoiceGroupRadio
} from '../../src';

export default function StoryDefault(): ReactElement {
  const [stateValue, setStateValue] = useState('s1');
  
  return <>
    <ChoiceGroupRadio<string> {...{
      datasource: [{
        value: 's1',
        label: 'check 1'
      }, {
        value: 's2',
        label: 'check 2'
      }],
      value: stateValue,
      onChange: setStateValue
    }} />
    <ChoiceGroupRadio<string> {...{
      datasource: [{
        value: 's1',
        label: 'check 1'
      }, {
        value: 's2',
        label: 'check 2'
      }],
      value: stateValue,
      onChange: setStateValue
    }} />
  </>;
}
