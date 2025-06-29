import {
  ChangeEvent,
  ReactElement,
  useCallback,
  useState
} from 'react';

import InputText from '../src';

export default function StoryControllable(): ReactElement {
  const [stateValue, setStateValue] = useState('');
  const handleNativeInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setStateValue(e.target.value);
  }, [setStateValue]);
  
  return <>
    <InputText {...{
      value: stateValue,
      onChange: setStateValue
    }} />
    <InputText {...{
      value: stateValue,
      onChange: setStateValue
    }} />
    <input {...{
      value: stateValue,
      onChange: handleNativeInputChange
    }} />
  </>;
}
