import {
  CanvasMarkingClassType,
  MarkingStats
} from '@kcuf/canvas-marking';

export interface IImperativeRef<T = unknown> {
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

// 插件开关，除了说明的默认开
export interface IPlugins {
  cursor?: boolean;
  tooltip?: boolean;
  magnet?: boolean;
  snapping?: boolean;
  zoom?: boolean;
  move?: boolean;
  stats?: boolean; // 默认 false
  fps?: boolean; // 默认 false
}
