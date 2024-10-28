import {
  HTMLAttributes
} from 'react';

export interface IModifier {
  codes: [string, string];
  last: string;
}

export interface IKeyboardInfo {
  codes: string[];
  capsLock: boolean;
}

export interface IKeyData {
  code: string;
  name: string | string[];
}

export interface IKeyboardMacProps extends HTMLAttributes<HTMLDivElement>, Partial<IKeyboardInfo> {
  /**
   * 是否监听键盘事件，默认 `true`，如果 `false`，可以通过 `codes` 和 `capsLock` 进行控制
   */
  listen?: boolean;
}