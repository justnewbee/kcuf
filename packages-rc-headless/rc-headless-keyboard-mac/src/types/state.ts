import {
  EKeyboardCode
} from '../enum';

import {
  IKeyDetails,
  IKeyboardModifiers
} from './common';

export interface IModelState {
  activeCodes: EKeyboardCode[];
  activeModifiers: IKeyboardModifiers;
  keyDetails: IKeyDetails | null;
}
