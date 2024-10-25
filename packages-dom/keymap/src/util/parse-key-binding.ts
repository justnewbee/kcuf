import {
  TKeyBindingPress
} from '../types';
import {
  MOD
} from '../const';

/**
 * Parses a "Key Binding String" into its parts
 *
 * grammar    = `<sequence>`
 * <sequence> = `<press> <press> <press> ...`
 * <press>    = `<key>` or `<mods>+<key>`
 * <mods>     = `<mod>+<mod>+...`
 * <key>      = `<KeyboardEvent.key>` or `<KeyboardEvent.code>` (case-insensitive)
 * <key>      = `(<regex>)` -> `/^<regex>$/` (case-sensitive)
 */
export default function parseKeybinding(keybinding: string): TKeyBindingPress[] {
  return keybinding.trim().split(' ').map(press => {
    const modifiers = press.split(/\b\+/);
    let key: string | RegExp = modifiers.pop() as string;
    const match = key.match(/^\((.+)\)$/);
    
    if (match) {
      key = new RegExp(`^${match[1]}$`);
    }
    
    return [modifiers.map(mod => (mod === '$mod' ? MOD : mod)), key];
  });
}