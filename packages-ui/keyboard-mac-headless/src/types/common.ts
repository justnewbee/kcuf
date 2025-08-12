import {
  EKeyboardCode
} from '../enum';

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

export interface IKeyboardModifiers {
  control?: '' | 'left' | 'right';
  alt?: '' | 'left' | 'right';
  shift?: '' | 'left' | 'right';
  meta?: '' | 'left' | 'right';
  capsLock?: boolean;
  fn?: boolean;
}
