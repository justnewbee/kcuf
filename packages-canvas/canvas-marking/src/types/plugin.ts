import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  ICanvasMarkingClass
} from './canvas-marking-class';
import {
  ICanvasMarkingStats
} from './stats';

export interface IMarkingPlugin<T = unknown> {
  run?(stats: ICanvasMarkingStats<T>, changeCause: EMarkingStatsChangeCause): void;
  cleanup?(): void;
}

export type TMarkingPluginRegister<T = unknown> = (markingStage: ICanvasMarkingClass<T>) => IMarkingPlugin<T>;
