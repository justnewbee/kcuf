import {
  EKeyboardCode
} from '../enum';

import {
  IKeyDetails,
  IModifierState
} from './common';

export interface IModelState {
  codes: EKeyboardCode[];
  modifierState: IModifierState;
  keyDetails: IKeyDetails | null;
}
