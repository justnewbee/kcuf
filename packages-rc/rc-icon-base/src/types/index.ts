import {
  HTMLAttributes
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

export interface IIconProps<T extends string = string> extends HTMLAttributes<HTMLElement> {
  type: T;
  rotate?: number;
  rotating?: boolean;
  colored?: boolean;
}

export interface IIconBaseProps<T extends string = string> extends IIconProps<T> {
  fontFamily: string;
  getIconCode(type: T): string;
  getIconColor?(type: T): string | null;
}

export interface IScIconBaseProps {
  $fontFamily: string;
  $rotate?: number;
  $rotating?: boolean;
  $code: string;
  $color: string | null;
}
