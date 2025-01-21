import {
  ButtonProps
} from '@kcuf-ui/rc-button';

export type TNavItemMark = 'external' | 'new' | 'beta-public' | 'beta' | 'alpha';

export type TUnfoldMode = boolean | 'first-level';

export interface INavItemPropsBase extends Omit<ButtonProps, 'iconStart' | 'iconEnd'> {
  key: string;
  icon?: string;
  mark?: TNavItemMark;
}

export interface INavItemProps extends INavItemPropsBase {
  selected?: boolean;
  subItems?: (INavItemProps | '-' | null)[];
  /**
   * 默认展开子项目，非受控，序列中的第一个带子项的将自动展开，覆盖顶级 props 指定的行为
   */
  defaultUnfolded?: boolean;
  /**
   * 搜索关键字，可提高命中率
   */
  keywords?: string[];
}

export interface INavItemInFooterProps extends INavItemPropsBase {}

export type TNavItem = INavItemProps | '-' | null;

// 解析后的类型
export interface IParsedDivider {
  key: string;
  divider: true;
  indent: number;
}

export interface IParsedItem extends Omit<INavItemProps, 'subItems'> {
  // 记一份原数据
  props: INavItemProps;
  divider: undefined;
  indent: number;
  subItems: (IParsedItem | IParsedDivider)[];
}

export type TParsedItemOrDivider = IParsedItem | IParsedDivider;

export interface IParsedItemInFooter extends INavItemInFooterProps {}
