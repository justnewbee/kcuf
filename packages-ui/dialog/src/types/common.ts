import {
  ReactElement
} from 'react';

export type TDialogAltIconType = 'info' | 'warn' | 'success' | 'error' | 'confirm';

export interface IDataPrompt {
  value: string;
}

export interface IPromptOptions {
  /**
   * 在输入框上边增加文案
   */
  message?: string | ReactElement;
  /**
   * 输入框的 placeholder
   */
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  softTrim?: boolean;
  asTextarea?: boolean;
}
