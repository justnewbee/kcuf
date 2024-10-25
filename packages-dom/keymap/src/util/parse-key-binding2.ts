import {
  IKeybindingParseResult
} from '../types';

import normalizeModifiers from './normalize-modifiers';

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
export default function parseKeybinding(keybinding: string): IKeybindingParseResult[] {
  return keybinding.trim().split(' ').map(press => {
    const modifiers = press.split(/\b\+/);
    
    let key: string | RegExp = modifiers.pop() as string;
    const match = key.match(/^\((.+)\)$/);
    
    if (match) {
      key = new RegExp(`^${match[1]}$`);
    }
    
    return {
      modifiers: normalizeModifiers(modifiers),
      key
    };
  });
}