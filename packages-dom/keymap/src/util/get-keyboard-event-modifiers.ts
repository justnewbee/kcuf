import {
  EModifier
} from '../enum';

export const MODIFIERS: EModifier[] = [
  EModifier.CONTROL,
  EModifier.ALT,
  EModifier.SHIFT,
  EModifier.META
];

export default function getKeyboardEventModifiers(e: KeyboardEvent): EModifier[] {
  return MODIFIERS.reduce((result: EModifier[], v) => {
    if (e.getModifierState(v)) {
      result.push(v);
    }
    
    return result;
  }, []);
}