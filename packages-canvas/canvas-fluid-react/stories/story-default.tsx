import {
  ReactElement,
  useState
} from 'react';

import {
  H1,
  InputNumber
} from '@kcuf/demo-rc';

import CanvasFluid from '../src';

export default function StoryDefault(): ReactElement {
  const [stateZ, setStateZ] = useState(50);
  
  return <>
    <H1>Move your mouse around, the fluid follows the pointer anywhere on the page</H1>
    <InputNumber {...{
      value: stateZ,
      onChange: setStateZ
    }} />
    <CanvasFluid zIndex={stateZ} />
  </>;
}
