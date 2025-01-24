/**
 * 预设大小
 */
export enum EButtonSize {
  NONE = 'none',
  XS = 'xs',
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl'
}

/**
 * 按钮层级
 */
export enum EButtonVariant {
  /**
   * 默认按钮
   */
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

// TODO 拆成 如下
//  color: default | primary | secondary | tertiary | danger
//  variant: ghost | outline | solid | text | none
export enum EButtonPreset {
  NONE = 'none',
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  LINK = 'link',
  TEXT = 'text'
}
