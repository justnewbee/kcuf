import {
  KeyboardModifiers
} from '@kcuf/rc-keyboard-mac';

export default function getModifierNamesAndSymbolsOld(modifiers: KeyboardModifiers): [string[], string[]] {
  const names: string[] = [];
  const symbols: string[] = [];
  
  if (modifiers.control) {
    names.push('Ctrl');
    symbols.push('⌃');
  }
  
  if (modifiers.alt) {
    names.push('Alt');
    symbols.push('⌥');
  }
  
  if (modifiers.shift) {
    names.push('Shift');
    symbols.push('⇧');
  }
  
  if (modifiers.meta) {
    names.push('Meta');
    symbols.push('⌘');
  }
  
  return [names, symbols];
}
