import {
  ReactElement,
  useState
} from 'react';

import InputSwitch from '../src';

export default function StoryControllable(): ReactElement {
  const [stateValue, setStateValue] = useState(false);
  
  return <>
    <InputSwitch {...{
      value: stateValue,
      onChange: setStateValue
    }} />
    <InputSwitch {...{
      value: stateValue,
      onChange: setStateValue
    }} />
    <input {...{
      type: 'checkbox',
      checked: stateValue,
      onChange: e => setStateValue(e.target.checked)
    }} />
  </>;
}
