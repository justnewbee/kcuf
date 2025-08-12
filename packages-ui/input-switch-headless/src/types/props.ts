import {
  HTMLAttributes,
  ReactElement
} from 'react';

export interface IModelProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'value' | 'defaultValue' | 'aria-checked' | 'role' | 'onClick' | 'onChange'> {
  /**
   * 受控值
   */
  value?: boolean;
  /**
   * 默认值
   */
  defaultValue?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 显示 Label
   */
  label?: string | ReactElement;
  /**
   * 用户操作引起的值变化时的回调
   */
  onChange?(value: boolean): void;
}
