import {
  ReactElement,
  useState
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import InputDebouncedValue from './rc/input-debounced-value';

export default function StoryUseDebouncedValue(): ReactElement {
  const [stateMounted, setStateMounted] = useState(true);
  
  return <>
    <InputSwitch {...{
      label: 'mounted',
      value: stateMounted,
      onChange: setStateMounted
    }} />
    {stateMounted ? <InputDebouncedValue /> : null}
  </>;
}
