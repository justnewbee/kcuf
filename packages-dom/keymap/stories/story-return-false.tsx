import {
  ReactElement,
  useState
} from 'react';

import {
  MinimalNormalize,
  InputSwitch,
  H1
} from '@kcuf/demo-rc';
import {
  KeyboardCode
} from '@kcuf/rc-keyboard-mac';

import {
  getModifierNamesAndSymbols
} from './util';
import {
  KeyboardWithModifiers,
  KeystrokeModifiers
} from './rc';

export default function StoryReturnFalse(): ReactElement {
  const [stateModifiers, setStateModifiers] = useState<KeyboardCode[]>([KeyboardCode.META_LEFT]);
  const [stateReturnFalse, setStateReturnFalse] = useState(true);
  const [modifierNames] = getModifierNamesAndSymbols(stateModifiers);
  
  return <>
    <MinimalNormalize />
    <KeyboardWithModifiers {...{
      extraCodes: [KeyboardCode.S, KeyboardCode.D, KeyboardCode.L],
      modifiers: stateModifiers,
      onModifiersChange: setStateModifiers
    }} />
    <H1>Return false == preventDefault + stopPropagation <InputSwitch {...{
      value: stateReturnFalse,
      label: 'Return false',
      onChange: setStateReturnFalse
    }} /></H1>
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