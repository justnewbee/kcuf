import _without from 'lodash/without';
import {
  ReactElement,
  useState,
  useCallback
} from 'react';

import {
  MinimalNormalize,
  H1,
  H2
} from '@kcuf/demo-rc';
import Keyboard, {
  KeyboardCode
} from '@kcuf/rc-keyboard-mac';

import {
  getModifierNamesAndSymbols
} from './util';
import {
  KeystrokeModifiers
} from './rc';

export default function StoryDefault(): ReactElement {
  const [stateModifiers, setStateModifiers] = useState<KeyboardCode[]>([KeyboardCode.ALT_LEFT]);
  const [modifierNames, modifierSymbols] = getModifierNamesAndSymbols(stateModifiers);
  
  const handleSetModifier = useCallback((code: KeyboardCode, theOtherCode: KeyboardCode): void => {
    setStateModifiers(value => {
      if (value.includes(code)) {
        return _without(value, code);
      }
      
      return [...value.includes(theOtherCode) ? _without(value, theOtherCode) : value, code];
    });
  }, [setStateModifiers]);
  
  const handleKeyboardKeyPress = useCallback((code: KeyboardCode) => {
    switch (code) {
      case KeyboardCode.CTRL_LEFT:
        handleSetModifier(code, KeyboardCode.CTRL_RIGHT);
        
        break;
      case KeyboardCode.CTRL_RIGHT:
        handleSetModifier(code, KeyboardCode.CTRL_LEFT);
        
        break;
      case KeyboardCode.ALT_LEFT:
        handleSetModifier(code, KeyboardCode.ALT_RIGHT);
        
        break;
      case KeyboardCode.ALT_RIGHT:
        handleSetModifier(code, KeyboardCode.ALT_LEFT);
        
        break;
      case KeyboardCode.SHIFT_LEFT:
        handleSetModifier(code, KeyboardCode.SHIFT_RIGHT);
        
        break;
      case KeyboardCode.SHIFT_RIGHT:
        handleSetModifier(code, KeyboardCode.SHIFT_LEFT);
        
        break;
      case KeyboardCode.META_LEFT:
        handleSetModifier(code, KeyboardCode.META_RIGHT);
        
        break;
      case KeyboardCode.META_RIGHT:
        handleSetModifier(code, KeyboardCode.META_LEFT);
        
        break;
      default:
        break;
    }
  }, [handleSetModifier]);
  
  return <>
    <MinimalNormalize />
    <Keyboard {...{
      listen: false,
      codes: [KeyboardCode.F1, KeyboardCode.D7, KeyboardCode.X, KeyboardCode.ESC, KeyboardCode.ENTER, ...stateModifiers],
      onKeyPress: handleKeyboardKeyPress
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
      theKey: '7',
      modifierNames,
      modifierSymbols
    }} />
    <H2>Letter</H2>
    <KeystrokeModifiers {...{
      theKey: 'X',
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
  </>;
}