import {
  ReactNode,
  ReactElement,
  HTMLAttributes
} from 'react';

import {
  EAlertTheme
} from '../enum';

export interface IPropsDom extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {}

export interface IPropsCustom {
  title?: string | ReactElement;
  message?: string | ReactElement;
  theme?: EAlertTheme;
  toast?: boolean;
  /**
   * 紧凑型，减小上下 padding
   */
  dense?: boolean;
  visible?: boolean;
  closable?: boolean;
  /**
   * 在 visible 之后自动开始倒计时关闭，单位 ms
   */
  autoClose?: number;
  onVisibleChange?(visible: boolean): void;
}

export interface IModelProps extends IPropsCustom, IPropsDom {}

export interface IModelProviderProps extends IModelProps {
  children: ReactNode;
}
