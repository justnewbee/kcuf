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
  code: EKeyboardCode;
  name: string | string[];
}

export interface IKeyboardProps extends Partial<IKeyboardInfo> {
  className?: string;
  style?: CSSProperties;
  /**
   * 是否监听键盘事件，默认 `true`，如果 `false`，可以通过 `codes` 和 `capsLock` 进行控制
   */
  listen?: boolean;
  /**
   * 点击按钮，返回的是 code
   */
  onKeyPress?(code: EKeyboardCode): void;
}