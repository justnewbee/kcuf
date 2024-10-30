import {
  ReactElement,
  useState
} from 'react';

import {
  MinimalNormalize,
  H1,
  H2
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

export default function StoryDefault(): ReactElement {
  const [stateModifiers, setStateModifiers] = useState<KeyboardCode[]>([KeyboardCode.ALT_LEFT]);
  const [modifierNames, modifierSymbols] = getModifierNamesAndSymbols(stateModifiers);
  
  return <>
    <MinimalNormalize />
    <KeyboardWithModifiers {...{
      extraCodes: [KeyboardCode.F1, KeyboardCode.D1, KeyboardCode.X, KeyboardCode.ESC, KeyboardCode.ENTER],
      modifiers: stateModifiers,
      onModifiersChange: setStateModifiers
    }} />
    <H1>Modifiers ⌃ ⌥ ⇧ ⌘</H1>
    <H2>F1-F12</H2>
    <KeystrokeModifiers {...{
      theKey: 'F1',
      modifierNames,
      modifierSymbols
    }} />
    <H2>Number</H2>
    <KeystrokeModifiers {...{
      theKey: '1',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '!',
      modifierNames,
      modifierSymbols
    }} />
    <H2>Letter</H2>
    <KeystrokeModifiers {...{
      theKey: 'X',
      modifierNames,
      modifierSymbols
    }} />
    <H2>Symbol</H2>
    <KeystrokeModifiers {...{
      theKey: '=',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '+',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '/',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '?',
      modifierNames,
      modifierSymbols
    }} />
    <H2>Functional</H2>
    <KeystrokeModifiers {...{
      theKey: 'Escape',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '⎋',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: 'Enter',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '⏎',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: 'Space',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '␣',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: 'Backspace',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '⌫',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: 'Delete',
      modifierNames,
      modifierSymbols
    }} />
    <KeystrokeModifiers {...{
      theKey: '⌦',
      modifierNames,
      modifierSymbols
    }} />
  </>;
}