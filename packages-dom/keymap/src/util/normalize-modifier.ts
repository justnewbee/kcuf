import {
  EModifierKey
} from '../enum';
import {
  MODIFIER_ALIAS
} from '../const';

export default function normalizeModifier(modifier: string): EModifierKey | null {
  return MODIFIER_ALIAS[modifier.toUpperCase()] || null;
}
