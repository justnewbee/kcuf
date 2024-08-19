import {
  ReactElement,
  useState
} from 'react';

import {
  H1,
  CodeViewer,
  InputSwitch
} from '@kcuf/demo-rc';

import {
  genModuleCssVar
} from './helper';

export default function GeneratorLess(): ReactElement {
  const [stateDark, setStateDark] = useState(false);
  
  return <>
    <H1>实际使用的不是这个</H1>
    <InputSwitch {...{
      label: 'Dark',
      value: stateDark,
      onChange: setStateDark
    }} />
    <CodeViewer language="less">{genModuleCssVar(stateDark)}</CodeViewer>
  </>;
}
