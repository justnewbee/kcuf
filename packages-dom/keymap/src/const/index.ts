import {
  EModifier
} from '../enum';

export const MODIFIERS = [
  EModifier.CONTROL,
  EModifier.ALT,
  EModifier.SHIFT,
  EModifier.META
];

/**
 * These are the modifier keys that change the meaning of keybindings.
 *
 * Note: Ignoring "AltGraph" because it is covered by the others.
 */
export const KEYBINDING_MODIFIER_KEYS = ['Shift', 'Meta', 'Alt', 'Control'];

/**
 * Keybinding sequences should timeout if individual key presses are more than
 * 1s apart by default.
 */
export const DEFAULT_TIMEOUT = 1000;

/**
 * Platform detection code.
 * @see https://kkgithub.com/jamiebuilds/tinykeys/issues/184
 */
export const PLATFORM = typeof navigator === 'object' ? navigator.platform : '';
export const APPLE_DEVICE = /Mac|iPod|iPhone|iPad/.test(PLATFORM);

/**
 * Meaning of `AltGraph`, from MDN:
 * - Windows: Both Alt and Ctrl keys are pressed, or AltGr key is pressed
 * - Mac: ⌥ Option key pressed
 * - Linux: Level 3 Shift key (or Level 5 Shift key) pressed
 * - Android: Not supported
 * @see https://kkgithub.com/jamiebuilds/tinykeys/issues/185
 */
export const ALT_GRAPH_ALIASES = PLATFORM === 'Win32' ? ['Control', 'Alt'] : APPLE_DEVICE ? ['Alt'] : [];