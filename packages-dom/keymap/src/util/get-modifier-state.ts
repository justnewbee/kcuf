import {
  EModifier
} from '../enum';
import {
  ALT_GRAPH_ALIASES
} from '../const';

/**
 * There's a bug in Chrome that causes event.getModifierState not to exist on
 * KeyboardEvent's for F1/F2/etc keys.
 */
export default function getModifierState(e: KeyboardEvent, modifier: EModifier): boolean {
  return typeof e.getModifierState === 'function' ? e.getModifierState(modifier) || (ALT_GRAPH_ALIASES.includes(modifier) && e.getModifierState('AltGraph')) : false;
}