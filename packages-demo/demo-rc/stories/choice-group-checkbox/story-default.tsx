import {
  ReactElement
} from 'react';

import {
  ChoiceGroupCheckbox
} from '../../src';

export default function StoryDefault(): ReactElement {
  return <ChoiceGroupCheckbox<string> {...{
    label: 'Label',
    dataSource: [{
      value: 's1',
      label: 'check 1'
    }, {
      value: 's2',
      label: 'check 2'
    }]
  }} />;
}
