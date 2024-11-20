import {
  ReactElement,
  useState
} from 'react';

import {
  InputCheckbox
} from '../../src';

export default function StoryDefault(): ReactElement {
  const [stateChecked, setStateChecked] = useState(false);
  
  return <>
    <InputCheckbox {...{
      label: 'Checkbox 1',
      checked: stateChecked,
      onChange: setStateChecked
    }} />
    <InputCheckbox {...{
      label: 'Checkbox 2',
      checked: stateChecked,
      onChange: setStateChecked
    }} />
  </>;
}
