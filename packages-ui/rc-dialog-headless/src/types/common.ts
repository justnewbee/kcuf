import {
  HTMLAttributes,
  MouseEvent,
  ReactElement
} from 'react';

import {
  ButtonProps
} from '@kcuf-ui/rc-button-headless';

import {
  EDialogMode,
  EDialogSize
} from '../enum';

/**
 * 标题、按钮等可以根据 dialogData 进行动态控制
 */
export type TDynamicByData<T = void, D extends object = Record<string, unknown>> = T | ((dialogData: D) => T);

export interface IDialogButtonProps<T = void, D extends object = Record<string, unknown>> extends Omit<ButtonProps, 'onClick'> {
  // 是否使用主按钮，一般情况下 Dialog 都会自动判断，不需要传
  primary?: boolean;
  // 点击该按钮的时候，对 Promise value 产生的效果
  result?: TDynamicByData<T, D>;
  // 覆盖
  /**
   * button.onClick 方法定义，可以返回 false 阻止 Dialog 关闭（默认行为是点击后关闭）
   */
  onClick?(dialog: IContextForContent<T, D>, e: MouseEvent<HTMLElement>): boolean | void; // eslint-disable-line no-use-before-define
}

export type TDialogButton<T = void, D extends object = Record<string, unknown>> = string | ReactElement | IDialogButtonProps<T, D>;

/**
 * Dialog props 定义
 */
export interface IDialogProps<T = void, D extends object = Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'content'> {
  /* --- 内容 & 展示 --- */
  title?: TDynamicByData<string | ReactElement, D>;
  titleExtra?: TDynamicByData<string | ReactElement, D>;
  buttons?: TDynamicByData<TDialogButton<T, D>[], D>;
  content?: string | ReactElement;
  contentClassName?: string;
  mode?: EDialogMode | `${EDialogMode}`;
  size?: TDynamicByData<number | EDialogSize | `${EDialogSize}`, D>;
  /* --- 行为 --- */
  backdrop?: boolean; // 是否需要背投
  closable?: boolean; // 显示关闭按钮
  esc?: boolean | number; // 键盘的 ESC，当 closable = false 时，若要启用此功能，则必须为 -1
  externalClose?: boolean | number; // 外部点击是否关闭当前 dialog，当 closable: false 时，若要启用此功能，则必须为 -1
  zIndex?: number; // Dialog 本体的 zIndex
  zIndexBackdrop?: number; // 背投的 zIndex，必须比 zIndex 小
  prevFocus?: Element | null; // 关闭后把焦点交还
  /* --- 数据 --- */
  data?: D; // TODO mv to promise in another context
  undefinedAsReject?: boolean;
  /* --- 事件 --- */
  /**
   * Dialog props.onClose 方法定义，value 的类型为 Promise resolve 的类型，
   * 执行关闭后发生（然而，真正的从 DOM 上移除还是必须要使用者自行处理）
   */
  onClose?(result?: T | Error, rejected?: boolean): void;
}

/**
 * 可以由内容组件控制并调整的 props，除了 content data 之外，几乎所有都可以修改
 */
export interface IDialogPropsMutable<T = void, D extends object = Record<string, unknown>> extends Omit<IDialogProps<T, D>, 'content' | 'data'> {}

// 给内容使用的 context
export interface IContextForContent<T = void, D extends object = Record<string, unknown>> {
  data: D;
  focus(): void;
  resetScrollTop(): void;
  unlock(): void;
  lock(loading?: boolean): void;
  update(propsUpdates: Partial<IDialogPropsMutable<T, D>>): void;
  updateData(dataUpdates: Partial<D>): void;
  forceUpdate(): void;
  close(result?: T | Error, rejected?: boolean): void;
}
