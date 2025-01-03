import {
  ReactElement,
  useState
} from 'react';

import {
  InputSwitch
} from '@kcuf/demo-rc';

import Fade from './rc/fade';

export default function StoryFade(): ReactElement {
  const [stateIn, setStateIn] = useState(false);
  
  return <>
    <InputSwitch {...{
      label: 'in',
      value: stateIn,
      onChange: setStateIn
    }} />
    <Fade in={stateIn} />
  </>;
}
