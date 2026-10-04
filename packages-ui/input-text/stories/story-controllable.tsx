import {
  ReactElement,
  useState
} from 'react';

import InputText from '../src';

export default function StoryControllable(): ReactElement {
  const [stateValue, setStateValue] = useState('');
  
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
      onChange: e => setStateValue(e.target.value)
    }} />
  </>;
}
