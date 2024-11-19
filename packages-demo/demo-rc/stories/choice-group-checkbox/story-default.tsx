import {
  ReactElement,
  useState
} from 'react';

import {
  ChoiceGroupCheckbox
} from '../../src';

export default function StoryDefault(): ReactElement {
  const [stateValue, setStateValue] = useState<string[]>(['s1']);
  
  return <>
    <ChoiceGroupCheckbox {...{
      dataSource: [{
        value: 's1',
        label: 'check 1'
      }, {
        value: 's2',
        label: 'check 2'
      }],
      value: stateValue,
      onChange: setStateValue
    }} />
    <ChoiceGroupCheckbox {...{
      dataSource: [{
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
