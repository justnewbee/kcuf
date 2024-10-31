import {
  Dispatch
} from 'react';

import {
  EAction,
  EKeyboardCode
} from '../enum';

import {
  IKeyDetails,
  IModifierState
} from './common';

export type TModelAction = {
  type: EAction.SET_CODES;
  payload: EKeyboardCode[];
} | {
  type: EAction.SET_CAPS_LOCK;
  payload: boolean;
} | {
  type: EAction.SET_KEY_DETAILS;
  payload: IKeyDetails | null;
} | {
  type: EAction.UPDATE_MODIFIER_STATE;
  payload: IModifierState;
};

export type TModelDispatch = Dispatch<TModelAction>;
