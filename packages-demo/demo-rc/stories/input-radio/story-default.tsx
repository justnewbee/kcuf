import {
  ReactElement,
  useState
} from 'react';

import {
  InputRadio
} from '../../src';

export default function StoryDefault(): ReactElement {
  const [stateChecked, setStateChecked] = useState(false);
  
  return <>
    <InputRadio {...{
      label: 'Radio 1',
      checked: stateChecked,
      onChange: setStateChecked
    }} />
    <InputRadio {...{
      label: 'Radio 2',
      checked: stateChecked,
      onChange: setStateChecked
    }} />
  </>;
}
