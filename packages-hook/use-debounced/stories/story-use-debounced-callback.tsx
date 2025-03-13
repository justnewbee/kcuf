import {
  ReactElement,
  useState
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import InputDebouncedCallback from './rc/input-debounced-callback';

export default function StoryUseDebouncedCallback(): ReactElement {
  const [stateMounted, setStateMounted] = useState(true);
  
  return <>
    <InputSwitch {...{
      label: 'mounted',
      value: stateMounted,
      onChange: setStateMounted
    }} />
    {stateMounted ? <InputDebouncedCallback /> : null}
  </>;
}
