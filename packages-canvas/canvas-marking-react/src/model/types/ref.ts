import {
  Ref,
  RefObject
} from 'react';

import {
  CanvasMarkingClassType,
  MarkingStats
} from '@kcuf/canvas-marking';

export interface IModelImperative<T = unknown> {
  getStats(): MarkingStats<T> | null;
  startCreating: CanvasMarkingClassType<T>['startCreating'];
  cancelCreating: CanvasMarkingClassType<T>['cancelCreating'];
  select: CanvasMarkingClassType<T>['select'];
  highlight: CanvasMarkingClassType<T>['highlight'];
  toggleMove: CanvasMarkingClassType<T>['toggleMove'];
  zoom: CanvasMarkingClassType<T>['zoom'];
  draw: CanvasMarkingClassType<T>['draw'];
  on: CanvasMarkingClassType<T>['on'];
}

export type TImperativeRef<T = unknown> = Ref<IModelImperative<T>>;

export type TDomRef = RefObject<HTMLDivElement | null>;
