import {
  IKeybinding
} from '../types';

/**
 * 同时兼容 [event.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) 和 [event.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
 */
export default function matchKeybindingKey(keybinding: IKeybinding, event: KeyboardEvent): boolean {
  const {
    key
  } = keybinding;
  
  return key.toUpperCase() === event.key.toUpperCase() || key.toUpperCase() === event.code.toUpperCase();
}