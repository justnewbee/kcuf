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
  KeyboardCode,
  KeyboardModifiers
} from '@kcuf-ui/rc-keyboard-mac';

import {
  getModifierNamesAndSymbols
} from './util';
import {
  KeystrokeModifiers
} from './rc';

export default function StoryReturnFalse(): ReactElement {
  const [stateModifiers, setStateModifiers] = useState<KeyboardModifiers>({
    meta: 'left'
  });
  const [stateReturnFalse, setStateReturnFalse] = useState(true);
  const [modifierNames] = getModifierNamesAndSymbols(stateModifiers);
  
  return <>
    <MinimalNormalize />
    <Keyboard {...{
      activeCodes: [KeyboardCode.S, KeyboardCode.D, KeyboardCode.L],
      activeModifiers: stateModifiers,
      onActiveModifiersChange: setStateModifiers
    }} />
    <H1>
      Return false == preventDefault + stopPropagation
      <InputSwitch {...{
        value: stateReturnFalse,
        label: 'Return false',
        onChange: setStateReturnFalse
      }} />
    </H1>
    <KeystrokeModifiers {...{
      theKey: 'S',
      modifierNames,
      returnFalse: stateReturnFalse
    }} />
    <KeystrokeModifiers {...{
      theKey: 'D',
      modifierNames,
      returnFalse: stateReturnFalse
    }} />
    <KeystrokeModifiers {...{
      theKey: 'L',
      modifierNames,
      returnFalse: stateReturnFalse
    }} />
  </>;
}
