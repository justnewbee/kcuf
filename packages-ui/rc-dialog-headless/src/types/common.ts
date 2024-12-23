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
  onClick?(dialog: IContextForContent<T, D>, e: MouseEvent<HTMLElement>): boolean | undefined;
}

export type TDialogButton<T = void, D extends object = Record<string, unknown>> = string | ReactElement | IDialogButtonProps<T, D>;

// /**
//  * 可以由内容组件控制并调整的 props，除了 content data 之外，几乎所有都可以修改
//  */
// export interface IDialogPropsMutable<T = void, D extends object = Record<string, unknown>> extends Omit<IDialogProps<T, D>, 'content' | 'data'> {}

// 给内容使用的 context
export interface IContextForContent<T = void, D extends object = Record<string, unknown>> {
  data: D;
  focus(): void;
  resetScrollTop(): void;
  unlock(): void;
  lock(loading?: boolean): void;
  // update(propsUpdates: Partial<IDialogPropsMutable<T, D>>): void;
  // updateData(dataUpdates: Partial<D>): void;
  forceUpdate(): void;
  close(result?: T | Error, rejected?: boolean): void;
}
