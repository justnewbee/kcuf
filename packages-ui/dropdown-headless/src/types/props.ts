import {
  ReactElement,
  HTMLAttributes
} from 'react';

import {
  TPadding
} from './common';

export interface IPropsTheDrop {
  header?: ReactElement | string | null;
  body?: ReactElement | string | null;
  footer?: ReactElement | string | null;
  align?: 'left' | 'right';
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  zIndex?: number;
  offset?: [number, number];
  /**
   * 是否加 header 背景
   */
  headerBg?: boolean;
  /**
   * 是否加 header 下边框
   */
  headerDivider?: boolean;
  /**
   * header 上下 padding
   */
  headerPadding?: TPadding;
  /**
   * body 上下 padding
   */
  bodyPadding?: TPadding;
  /**
   * 是否加 header 背景
   */
  footerBg?: boolean;
  /**
   * 是否加 footer 上边框
   */
  footerDivider?: boolean;
  /**
   * header 上下 padding
   */
  footerPadding?: TPadding;
  /**
   * 下拉框放哪里，默认放在组件下，当 z-index 无法逾越时，可以放在 body 下
   */
  dropContainer?: 'inside' | 'body';
}

export interface IModelProps extends IPropsTheDrop, Omit<HTMLAttributes<HTMLDivElement>, 'value' | 'defaultValue' | 'onChange'> {
  trigger: string | ReactElement;
  block?: boolean; // 默认为 inline-block
  disabled?: boolean;
  visible?: boolean; // 下拉是否可见（受控），如果 undefined 则表明不受控
  onEsc?(): void;
  onNavUp?(): void;
  onNavDown?(): void;
  onVisibleChange?(value: boolean): void;
}
