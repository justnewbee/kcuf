import {
  ReactElement,
  useState
} from 'react';

import {
  InputSwitch
} from '../../src';

export default function StoryDefault(): ReactElement {
  const [stateValue, setStateValue] = useState(false);
  
  return <>
    <InputSwitch {...{
      label: 'Switch 1',
      value: stateValue,
      onChange: setStateValue
    }} />
    <InputSwitch {...{
      label: 'Switch 2',
      value: stateValue,
      onChange: setStateValue
    }} /></>;
}
