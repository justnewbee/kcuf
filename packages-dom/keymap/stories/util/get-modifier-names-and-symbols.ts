import {
  KeyboardCode
} from '@kcuf/rc-keyboard-mac';

export default function getModifierNamesAndSymbols(modifiers: KeyboardCode[]): [string[], string[]] {
  const names: string[] = [];
  const symbols: string[] = [];
  
  modifiers.forEach(v => {
    switch (v) {
      case KeyboardCode.CONTROL_LEFT:
      case KeyboardCode.CONTROL_RIGHT:
        names.push('Ctrl');
        symbols.push('⌃');
        
        break;
      case KeyboardCode.ALT_LEFT:
      case KeyboardCode.ALT_RIGHT:
        names.push('Alt');
        symbols.push('⌥');
        
        break;
      case KeyboardCode.SHIFT_LEFT:
      case KeyboardCode.SHIFT_RIGHT:
        names.push('Shift');
        symbols.push('⇧');
        
        break;
      case KeyboardCode.META_LEFT:
      case KeyboardCode.META_RIGHT:
        names.push('Command');
        symbols.push('⌘');
        
        break;
      default:
        break;
    }
  });
  
  return [names, symbols];
}