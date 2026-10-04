import {
  RequiredSelected
} from '@kcuf/ts-missing-helpers';

import {
  IModelProps
} from './props';

export interface IModelContext {
  props: RequiredSelected<Omit<IModelProps, 'defaultValue'>, 'value' | 'onChange'>;
}
