import {
  EMarkingStatsChangeCause
} from '../enum';

import {
  IMarkingStats
} from './stats';

export interface IMarkingPlugin<T = unknown> {
  run?(stats: IMarkingStats<T>, changeCause: EMarkingStatsChangeCause): void;
  cleanup?(): void;
}
