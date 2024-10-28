import {
  HTMLAttributes
} from 'react';

export interface IKeyData {
  code: string;
  name: string | string[];
}

export interface IMacKeyBoardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 是否监听键盘事件，默认是
   */
  listen?: boolean;
}