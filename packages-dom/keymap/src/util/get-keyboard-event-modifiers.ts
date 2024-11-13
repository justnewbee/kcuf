import {
  EModifierKey
} from '../enum';

export const MODIFIERS: EModifierKey[] = [
  EModifierKey.CONTROL,
  EModifierKey.ALT,
  EModifierKey.SHIFT,
  EModifierKey.META
];

export default function getKeyboardEventModifiers(e: KeyboardEvent): EModifierKey[] {
  return MODIFIERS.reduce((result: EModifierKey[], v) => {
    if (e.getModifierState(v)) {
      result.push(v);
    }
    
    return result;
  }, []);
}
