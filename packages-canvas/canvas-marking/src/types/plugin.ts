import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  ICanvasMarkingClass
} from './canvas-marking-class';
import {
  IMarkingStats
} from './stats';

export interface IMarkingPlugin<T = unknown> {
  run?(stats: IMarkingStats<T>, changeCause: EMarkingStatsChangeCause): void;
  cleanup?(): void;
}

export type TMarkingPluginRegister<T = unknown> = (markingStage: ICanvasMarkingClass<T>) => IMarkingPlugin<T>;
