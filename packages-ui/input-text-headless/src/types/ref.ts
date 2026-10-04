import {
  Ref
} from 'react';

import {
  TriggerFocusOptions
} from '@kcuf/mere-dom';

export interface IModelImperative {
  focus(options?: TriggerFocusOptions): void;
  blur(): void;
  select(): void;
  selectText(start: number, end: number, backward?: boolean): void;
}

export type TImperativeRef = Ref<IModelImperative>;
