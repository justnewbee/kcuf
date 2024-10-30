import {
  CSSProperties
} from 'react';

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

export interface IKeyboardProps extends Partial<IKeyboardInfo> {
  className?: string;
  style?: CSSProperties;
  /**
   * 是否监听键盘事件，默认 `true`，如果 `false`，可以通过 `codes` 和 `capsLock` 进行控制。
   */
  listen?: boolean;
  /**
   * 将键盘事件的信息显示在空格键上，3s 后自动消失，默认 `true`。
   *
   * 注意，Mac 键盘在 CapsLock 的时候，按住 Shift 不会返回小写的 `key`，这里也不作纠正，如实反应。
   */
  displayEvent?: boolean;
  /**
   * 点击按钮的回调，当 `capsLock` 受控时，能够根据 `Shift` 正确返回大小写的 `key` 值，但不会根据 `Alt` 做出反应。
   */
  onKeyPress?(code: EKeyboardCode, key: string): void;
}

export interface IKeyboardKeyProps {
  data: IKeyData;
  // TODO mv logic to model so to remove props passing
  statusOn?: boolean;
  statusActive?: boolean;
  displayEvent?: boolean;
  onClick?(data: IKeyData): void;
}

export interface IKeyboardKeyNameProps {
  data: IKeyData;
  displayEvent?: boolean;
}