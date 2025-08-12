import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useState
} from 'react';

import InputSwitch from '../src';

export default function StoryControllable(): ReactElement {
  const [stateValue, setStateValue] = useState(false);
  const handleNativeInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStateValue(e.target.checked);
  }, [setStateValue]);
  
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
      onChange: handleNativeInputChange
    }} />
  </>;
}
