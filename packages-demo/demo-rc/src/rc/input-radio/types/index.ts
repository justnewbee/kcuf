import {
  InputHTMLAttributes
} from 'react';

interface IInputRadioPropsBase extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {}

export interface IInputRadioProps<T = void> extends IInputRadioPropsBase {
  value?: T;
  onChange?(checked: boolean, value?: T): void;
}

// export interface IInputRadioGroupProps<T, V = T> {
//   datasource: IChoiceItem<T>[];
//   value?: V;
//   defaultValue?: V;
//   onChange?(value: V): void;
// }
