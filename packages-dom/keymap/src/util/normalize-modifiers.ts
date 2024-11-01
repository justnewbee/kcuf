import {
  EModifierKey
} from '../enum';

import normalizeModifier from './normalize-modifier';

export default function normalizeModifiers(modifiers: string[]): EModifierKey[] {
  return modifiers.reduce((result: EModifierKey[], v) => {
    const modifier = normalizeModifier(v);
    
    if (modifier) {
      result.push(modifier);
    }
    
    return result;
  }, []);
}