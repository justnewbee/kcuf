import {
  ReactElement
} from 'react';

// export interface IFormItemLabelProps {
//   content: string | ReactElement;
//   width?: string;
//   textAlign?: string;
// }

export interface IFormItemProps {
  key?: string;
  label?: string | ReactElement; // | IFormItemLabelProps;
  content: string | ReactElement;
  help?: string | ReactElement;
}

export type TFormItem = IFormItemProps | null;
