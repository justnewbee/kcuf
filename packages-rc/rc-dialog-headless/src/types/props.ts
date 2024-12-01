import {
  HTMLAttributes,
  ReactElement
} from 'react';

import {
  EDialogMode,
  EDialogSize
} from '../enum';

import {
  TDialogButton
} from './common';

/**
 * Dialog props 定义
 */
export interface IDialogProps<T = void> extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /* --- 内容 & 展示 --- */
  title?: string | ReactElement;
  titleExtra?: string | ReactElement;
  buttons?: TDialogButton<T>[];
  content?: string | ReactElement;
  // contentClassName?: string;
  mode?: EDialogMode | `${EDialogMode}`;
  size?: number | EDialogSize | `${EDialogSize}`;
  /* --- 行为 --- */
  backdrop?: boolean; // 是否需要背投
  closable?: boolean; // 显示关闭按钮
  esc?: boolean | 'always'; // 键盘的 ESC，当 `closable = false` 时，若要启用此功能，则必须为 `always`
  externalClose?: boolean | 'always'; // 外部点击是否关闭当前 Dialog，当 `closable: false` 时，若要启用此功能，则必须为 `always`
  zIndex?: number; // Dialog 本体的 zIndex
  zIndexBackdrop?: number; // 背投的 zIndex，必须比 zIndex 小
  prevFocus?: Element | null; // 关闭后把焦点交还
  /* --- 数据 --- */
  // data?: D; // TODO mv to promise in another context
  undefinedAsReject?: boolean;
  /* --- 事件 --- */
  /**
   * Dialog props.onClose 方法定义，value 的类型为 Promise resolve 的类型，
   * 执行关闭后发生（然而，真正的从 DOM 上移除还是必须要使用者自行处理）
   */
  onClose?(result?: T | Error, rejected?: boolean): void;
}
