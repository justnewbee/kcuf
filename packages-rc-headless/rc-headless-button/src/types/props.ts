import {
  ReactElement,
  ButtonHTMLAttributes,
  HTMLAttributeAnchorTarget
} from 'react';

import {
  EButtonPreset,
  EButtonSize
} from '../enum';

import {
  TButtonIconSpacing,
  TButtonTextAlign
} from './common';

export interface IPropsDom extends ButtonHTMLAttributes<HTMLElement> {
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  [dataName: `data-${string}`]: unknown;
}

export interface IPropsCustom {
  component?: 'button' | 'a' | 'span' | 'div'; // 理论上 button 不能包含 button 和 a，a 不能包含 a，当视觉上有这样的场景的时候，可以用该属性（无法搞成 as..）
  /**
   * or you can use `children` instead, but i prefer this way
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
  iconSpacing?: TButtonIconSpacing;
  /**
   * 左侧 Icon
   *
   * 1. 如果 loading 中，渲染 Loading 图标
   * 2. 如果是一个空格，则渲染一个占位（为保持图标在视觉上的垂直对齐）
   * 3. 否则渲染组件
   */
  iconLeft?: ' ' | ReactElement;
  iconLeftClassName?: string;
  /**
   * 右侧 Icon，类上
   */
  iconRight?: ReactElement;
  iconRightClassName?: string;
  preset?: EButtonPreset | `${EButtonPreset}`;
  size?: EButtonSize | `${EButtonSize}`;
  /**
   * a button is by default center aligned (`align` is a deprecated HTML attribute)
   */
  textAlign?: TButtonTextAlign;
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
}

export interface IModelProps extends Omit<IPropsDom, 'title'>, IPropsCustom {}
