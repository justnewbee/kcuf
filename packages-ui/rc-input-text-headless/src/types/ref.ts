import {
  TriggerFocusOptions
} from '@kcuf/mere-dom';

export interface IImperativeRef {
  domInput: HTMLInputElement | null;
  focus(options?: TriggerFocusOptions): void;
  blur(): void;
  select(): void;
  selectText(start: number, end: number, backward?: boolean): void;
}
