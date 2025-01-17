import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useState
} from 'react';

import InputSwitch from '../src';

export default function StoryControllable(): ReactElement {
  const [stateValue, setStateValue] = useState('');
  const handleNativeInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStateValue(e.target.value);
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
      value: stateValue,
      onChange: handleNativeInputChange
    }} />
  </>;
}
