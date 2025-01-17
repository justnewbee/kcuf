import {
  ReactNode,
  ReactElement,
  InputHTMLAttributes
} from 'react';

import {
  TChangeReason
} from './common';

export interface IButtonCustomProps {
  // -------- 内容 -------- //
  /**
   * 输入框外的前置附加内容
   */
  addonBefore?: string | ReactElement;
  /**
   * 输入框外的后置附加内容
   */
  addonAfter?: string | ReactElement;
  /**
   * 输入框内的前置附加内容，可用来显示文字或图表
   */
  addonPrefix?: string | ReactElement;
  /**
   * 输入框内的后置附加内容，可用来显示文字或图表
   */
  addonSuffix?: string | ReactElement;
  // -------- 长相 -------- //
  /**
   * 形态变体
   */
  variant?: 'subtle' | 'underline' | 'transparent';
  /**
   * 是否两端圆形
   */
  round?: boolean;
  /**
   * 是否占满容器宽度
   *
   * @default true
   */
  fluid?: boolean; // 参考 https://semantic-ui.com/elements/input.html#fluid
  /**
   * 加载状态，有 `value` 才展示
   */
  status?: 'loading' | 'success' | 'error';
  // -------- 行为 -------- //
  /**
   * 是否软 `trim`，即返回 `onChange` 时返回的值两端没有空格
   *
   * @default true
   */
  trim?: boolean;
  /**
   * 是否展示清除按钮，有 `value` 且 `status` 为空才展示
   */
  withClear?: boolean;
  /**
   * 是否展示字数，若设置 `maxLength` 则默认显示，否则不要显式开启或关闭
   */
  count?: boolean;
  // -------- 事件 -------- //
  onChange?(value: string, reason: TChangeReason): void;
  // onMouseEnter?(e: MouseEvent): void;
  // onMouseLeave?(e: MouseEvent): void;
  /**
   * 可代替 `onFocus/onBlur`
   */
  onFocusedChange?(focused: boolean): void;
  /**
   * 可代替 `onMouseEnter/onMouseLeave`
   */
  onHoveredChange?(hovered: boolean): void;
}

export interface IInputElementProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'type'> {
  value?: string;
  defaultValue?: string;
}

export interface IModelProps extends Omit<IInputElementProps, 'onChange'/*  | 'onMouseEnter' | 'onMouseLeave' */>, IButtonCustomProps {}

export interface IModelProviderProps extends IModelProps {
  children?: ReactNode;
}
