import _without from 'lodash/without';
import {
  ReactElement,
  useState,
  useCallback
} from 'react';

import Keyboard, {
  KeyboardCode
} from '@kcuf/rc-keyboard-mac';

interface IProps {
  extraCodes?: KeyboardCode[];
  modifiers?: KeyboardCode[];
  onModifiersChange?(modifiers: KeyboardCode[]): void;
}

/**
 * 可以让 Modifiers 受控
 */
export default function KeyboardWithModifiers({
  extraCodes,
  modifiers,
  onModifiersChange
}: IProps): ReactElement {
  const [stateModifiers, setStateModifiers] = useState<KeyboardCode[]>(modifiers || []);
  
  const handleSetModifier = useCallback((code: KeyboardCode, theOtherCode: KeyboardCode): void => {
    const newValue = stateModifiers.includes(code) ? _without(stateModifiers, code) : [
      ...stateModifiers.includes(theOtherCode) ? _without(stateModifiers, theOtherCode) : stateModifiers, code
    ];
    
    setStateModifiers(newValue);
    onModifiersChange?.(newValue);
  }, [stateModifiers, setStateModifiers, onModifiersChange]);
  
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
  
  return <Keyboard {...{
    codes: [...modifiers || stateModifiers, ...extraCodes || []],
    onKeyPress: handleKeyboardKeyPress
  }} />;
}