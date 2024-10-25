import {
  EModifier
} from '../enum';
import {
  APPLE_DEVICE
} from '../const';

const MAPPING: Record<string, EModifier> = {
  CONTROL: EModifier.CONTROL,
  CTRL: EModifier.CONTROL,
  '⌃': EModifier.CONTROL,
  ALT: EModifier.ALT,
  OPTION: EModifier.ALT,
  '⌥': EModifier.ALT,
  SHIFT: EModifier.SHIFT,
  '⇧': EModifier.SHIFT,
  META: EModifier.META,
  COMMAND: EModifier.META,
  CMD: EModifier.META,
  '⌘': EModifier.META,
  $MOD: APPLE_DEVICE ? EModifier.META : EModifier.CONTROL
};

export default function normalizeModifier(modifier: string): EModifier | null {
  return MAPPING[modifier.toUpperCase()] || null;
}