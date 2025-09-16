import {
  EModifierKey
} from '../enum';
import {
  SYSTEM_IS_MAC
} from '../const';

const MODIFIER_SYMBOL: Record<EModifierKey, string> = {
  [EModifierKey.CONTROL]: '⌃',
  [EModifierKey.ALT]: '⌥',
  [EModifierKey.SHIFT]: '⇧',
  [EModifierKey.META]: '⌘',
  [EModifierKey.$MOD]: SYSTEM_IS_MAC ? '⌘' : '⌃'
};

export default function getModifierKeySymbol(modifierKey: EModifierKey): string {
  return MODIFIER_SYMBOL[modifierKey];
}
