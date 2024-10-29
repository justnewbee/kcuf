import {
  ReactElement,
  useState
} from 'react';

import {
  MinimalNormalize,
  InputSwitch,
  H1
} from '@kcuf/demo-rc';
import Keyboard, {
  KeyboardCode
} from '@kcuf/rc-keyboard-mac';

import {
  GridContainer,
  Keystroke
} from './rc';

export default function StoryReturnFalse(): ReactElement {
  const [stateReturnFalse, setStateReturnFalse] = useState(true);
  
  return <>
    <MinimalNormalize />
    <Keyboard {...{
      codes: [KeyboardCode.META_LEFT, KeyboardCode.S]
    }} />
    <H1>Return false == preventDefault + stopPropagation</H1>
    <GridContainer>
      <InputSwitch {...{
        value: stateReturnFalse,
        label: 'Return false',
        onChange: setStateReturnFalse
      }} />
      <Keystroke {...{
        keystroke: 'Cmd+S',
        returnFalse: stateReturnFalse
      }} />
      <Keystroke {...{
        keystroke: 'Cmd+D',
        returnFalse: stateReturnFalse
      }} />
      <Keystroke {...{
        keystroke: 'Cmd+L',
        returnFalse: stateReturnFalse
      }} />
    </GridContainer>
  </>;
}