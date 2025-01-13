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

export type TIconBaseRef = Ref<HTMLSpanElement>;

/**
 * 用于 Icon 组件的范类型
 */
export interface IIconPropsGeneric<T extends string = string> extends HTMLAttributes<HTMLElement> {
  /**
   * 类型名，决定图标长什么样。尽量使用语义化的名称，比如 `close` 等。一般来说，一个 `type` 对应一个图标的 code，
   * 但出于语义化的考量，不同的 `type` 可以对应到同一个 `code`，比如 ✔ 这样的图标，其 `type` 可以是 `success` 和 `check`
   */
  type: T;
  /**
   * 是否为禁用状态，一般和 `onClick` 一起用，`disabled: true` 时，不会触发 `onClick`
   */
  disabled?: boolean;
  /**
   * 是否展示预设的颜色
   */
  colored?: boolean;
  /**
   * 旋转图标，单位为 °，`rotate: 90` 表示顺时针旋转 90°，`rotate: -90` 表示逆时针旋转 90°
   */
  rotate?: number;
  /**
   * 若 rotate 后图标的大小可能不令人满意，可以用它矫正，一般情况下不要用
   */
  scale?: number;
}

export interface IIconBaseProps<T extends string = string> extends IIconPropsGeneric<T> {
  /**
   * 图标字体名称，由 `generateFontFamilyForIcon` 生成
   */
  fontFamily: string;
  /**
   * 是否让图标一直旋转，一般只用在 Loading 等图标上
   *
   * @default
   * @defaultValue false
   */
  rotating?: boolean;
  darkThemePrefix?: string;
  getIconCode(type: T): string;
  getIconColor?(type: T): string | null;
  getIconColorDark?(type: T): string | null;
}

export interface IScIconBaseProps {
  $fontFamily: string;
  $code: string;
  $darkThemePrefix?: string;
  $color: string | null;
  $colorDark: string | null;
  $rotating?: boolean;
  $rotate?: number;
  $scale?: number;
}
