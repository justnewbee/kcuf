import {
  ReactNode,
  ReactElement,
  ButtonHTMLAttributes,
  HTMLAttributeAnchorTarget
} from 'react';

import {
  EButtonVariant,
  EButtonSize
} from '../enum';

import {
  TIconSpacing,
  TTextAlign
} from './common';

export interface IPropsDom extends Omit<ButtonHTMLAttributes<HTMLElement>, 'children'> {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  [dataName: `data-${string}`]: unknown;
}

export interface IPropsCustom {
  component?: 'button' | 'a' | 'span' | 'div'; // 理论上 button 不能包含 button 和 a，a 不能包含 a，当视觉上有这样的场景的时候，可以用该属性（无法搞成 as..）
  /**
   * Or you can use `children` instead, but label is preferred
   */
  label?: string | ReactElement;
  /**
   * 为 `true` 时，使用 label（如果它是 string 的话）作为 title
   */
  title?: string | boolean;
  /**
   * 在按钮左侧展示 loading 图标，比 iconLeft 优先级高
   */
  loading?: boolean;
  /**
   * 定义 iconLeft、iconRight 与 label 之间的间距，默认 8，small 为 4，no 为 0
   */
  iconSpacing?: TIconSpacing;
  /**
   * 左侧 Icon
   *
   * 1. 如果是一个空格，则渲染一个占位（为保持图标在视觉上的垂直对齐）
   * 3. 如果是 JSX 那就是 JSX
   */
  iconLeft?: ' ' | ReactElement;
  /**
   * 右侧 Icon，类上
   */
  iconRight?: ReactElement;
  theme?: EButtonVariant;
  size?: EButtonSize;
  /**
   * a button is by default center aligned (`align` is a deprecated HTML attribute)
   */
  textAlign?: TTextAlign;
  cursor?: string;
  /**
   * 在有边框的时候，按钮默认会有个很小的圆角（2px），可以设置
   * - true 默认
   * - false 没有圆角
   * - 'full' 两头圆角
   */
  borderRadius?: boolean | 'full';
  /**
   * 去掉 hover 及 active 时的 shadow（对非 tertiary 和 text）
   */
  noShadow?: boolean;
  /**
   * whether to display as a block level dom
   */
  block?: boolean;
  /**
   * 将状态锁定在 active
   */
  active?: boolean;
  // class 钩子，以便有需要自定义样式（比如 responsive 的情况，隐藏图标的需求）
  classNameForIconLeft?: string;
  classNameForIconRight?: string;
}

export interface IModelProps extends Omit<IPropsDom, 'title'>, IPropsCustom {}

export interface IModelProviderProps extends IModelProps {
  children: ReactNode;
}
