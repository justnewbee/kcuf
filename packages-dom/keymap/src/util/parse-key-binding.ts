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
export default function parseKeybinding(str: string): TKeyBindingPress[] {
  return str.trim().split(' ').map(press => {
    let mods = press.split(/\b\+/);
    let key: string | RegExp = mods.pop() as string;
    const match = key.match(/^\((.+)\)$/);
    
    if (match) {
      key = new RegExp(`^${match[1]}$`);
    }
    
    mods = mods.map(mod => (mod === '$mod' ? MOD : mod));
    
    return [mods, key];
  });
}