import {
  EModifier
} from '../enum';

import normalizeModifier from './normalize-modifier';

export default function normalizeModifiers(modifiers: string[]): EModifier[] {
  return modifiers.reduce((result: EModifier[], v) => {
    const modifier = normalizeModifier(v);
    
    if (modifier) {
      result.push(modifier);
    }
    
    return result;
  }, []);
}