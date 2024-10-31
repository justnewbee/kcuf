import {
  EKeyboardCode
} from '../enum';

export interface IModifier {
  codes: [EKeyboardCode, EKeyboardCode]; // left & right
  last: EKeyboardCode | null;
}

export interface IKeyboardInfo {
  codes: EKeyboardCode[];
  capsLock: boolean;
}

export interface IKeyData {
  code: EKeyboardCode; // KeyboardEvent.code
  key?: string; // KeyboardEvent.key
  keyShift?: string; // KeyboardEvent.key when Shift is ON
  name?: string | [string, string];
}

export interface IKeyDetails {
  key: string;
  code: string;
  keyCode?: number;
  control: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
}

export interface IModifierState {
  control?: '' | 'left' | 'right';
  alt?: '' | 'left' | 'right';
  shift?: '' | 'left' | 'right';
  meta?: '' | 'left' | 'right';
  capsLock?: boolean;
  fn?: boolean;
}