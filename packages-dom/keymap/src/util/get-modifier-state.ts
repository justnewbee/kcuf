import { ALT_GRAPH_ALIASES } from '../const';

/**
 * There's a bug in Chrome that causes event.getModifierState not to exist on
 * KeyboardEvent's for F1/F2/etc keys.
 */
export default function getModifierState(event: KeyboardEvent, mod: string) {
  return typeof event.getModifierState === 'function' ? event.getModifierState(mod) || (ALT_GRAPH_ALIASES.includes(mod) && event.getModifierState('AltGraph')) : false;
}