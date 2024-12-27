import {
  HTMLAttributes,
  Ref
} from 'react';

export interface IInjectIconFontOptions {
  /**
   * 可能从 2022/11 开始，iconfont 在新生出来的 CDN 上拼了一些东西...
   *
   * - `//at.alicdn.com/t/font_{project}_{hash}.{ext}` 以前的项目
   * - `//at.alicdn.com/t/a/font_{project}_{hash}.{ext}` 阿里内部用户的项目
   * - `//at.alicdn.com/t/c/font_{project}_{hash}.{ext}` 外部用户的项目
   */
  pathExtra?: '/a' | '/c' | '';
  /**
   * 是否放 base64
   */
  base64Data?: string;
}

export type TIconRef = Ref<HTMLSpanElement>;

export interface IIconProps<T extends string = string> extends HTMLAttributes<HTMLElement> {
  type: T;
  disabled?: boolean;
  colored?: boolean;
  rotating?: boolean;
  rotate?: number;
  // rotate 的时候，图标的大小可能不令人满意，可以用它矫正
  scale?: number;
}

export interface IIconBaseProps<T extends string = string> extends IIconProps<T> {
  fontFamily: string;
  getIconCode(type: T): string;
  getIconColor?(type: T): string | null;
}

export interface IScIconBaseProps {
  $fontFamily: string;
  $code: string;
  $color: string | null;
  $rotating?: boolean;
  $rotate?: number;
  $scale?: number;
  $cursor?: string;
}
