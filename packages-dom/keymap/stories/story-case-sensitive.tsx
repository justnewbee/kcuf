import {
  ReactElement,
  useState
} from 'react';

import {
  MinimalNormalize,
  H1,
  InputSwitch
} from '@kcuf/demo-rc';
import {
  KeyboardCode
} from '@kcuf/rc-keyboard-mac';

import {
  KeyboardWithModifiers,
  GridContainer,
  Keystroke
} from './rc';
import {
  getModifierNamesAndSymbols
} from './util';

export default function StoryCaseSensitive(): ReactElement {
  const [stateModifiers, setStateModifiers] = useState<KeyboardCode[]>([KeyboardCode.SHIFT_LEFT]);
  const [modifierNames] = getModifierNamesAndSymbols(stateModifiers);
  const [stateCaseSensitive, setStateCaseSensitive] = useState(true);
  
  return <>
    <MinimalNormalize />
    <KeyboardWithModifiers {...{
      extraCodes: [KeyboardCode.X, KeyboardCode.F1],
      modifiers: stateModifiers,
      onModifiersChange: setStateModifiers
    }} />
    <H1>Case Sensitive <InputSwitch label="case sensitive" value={stateCaseSensitive} onChange={setStateCaseSensitive} /></H1>
    <GridContainer>
      <Keystroke {...{
        keystroke: 'X',
        caseSensitive: stateCaseSensitive
      }} />
      <Keystroke {...{
        keystroke: 'x',
        caseSensitive: stateCaseSensitive
      }} />
      <Keystroke {...{
        keystroke: [...modifierNames, 'X'].join('+'),
        caseSensitive: stateCaseSensitive
      }} />
      <Keystroke {...{
        keystroke: [...modifierNames, 'x'].join('+'),
        caseSensitive: stateCaseSensitive
      }} />
    </GridContainer>
    <GridContainer>
      <Keystroke {...{
        keystroke: 'F1',
        caseSensitive: stateCaseSensitive
      }} />
      <Keystroke {...{
        keystroke: [...modifierNames, 'F1'].join('+'),
        caseSensitive: stateCaseSensitive
      }} />
    </GridContainer>
  </>;
}