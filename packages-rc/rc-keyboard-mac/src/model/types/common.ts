import {
  EKeyboardCode
} from '../enum';

export interface IModifier {
  codes: [EKeyboardCode, EKeyboardCode]; // left & right
  last: EKeyboardCode | null;
}

export interface IKeyboardInfo {
  codes: string[];
  capsLock: boolean;
}

export interface IKeyData {
  code: EKeyboardCode; // KeyboardEvent.code
  key?: string; // KeyboardEvent.key
  keyShift?: string; // KeyboardEvent.key when Shift is ON
  name?: string | [string, string];
}
