import {
  EModifierKey
} from '../enum';
import {
  APPLE_DEVICE
} from '../const';

const MAPPING: Record<string, EModifierKey> = {
  CONTROL: EModifierKey.CONTROL,
  CTRL: EModifierKey.CONTROL,
  '⌃': EModifierKey.CONTROL,
  ALT: EModifierKey.ALT,
  OPTION: EModifierKey.ALT,
  '⌥': EModifierKey.ALT,
  SHIFT: EModifierKey.SHIFT,
  '⇧': EModifierKey.SHIFT,
  META: EModifierKey.META,
  COMMAND: EModifierKey.META,
  CMD: EModifierKey.META,
  '⌘': EModifierKey.META,
  $MOD: APPLE_DEVICE ? EModifierKey.META : EModifierKey.CONTROL
};

export default function normalizeModifier(modifier: string): EModifierKey | null {
  return MAPPING[modifier.toUpperCase()] || null;
}