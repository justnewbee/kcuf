import {
  Dispatch
} from 'react';

import {
  EAction,
  EKeyboardCode
} from '../enum';

import {
  IKeyDetails,
  IKeyboardModifiers
} from './common';

export type TModelAction = {
  type: EAction.PUSH_ACTIVE_CODE | EAction.PULL_ACTIVE_CODE;
  payload: EKeyboardCode;
} | {
  type: EAction.SET_CAPS_LOCK;
  payload: boolean;
} | {
  type: EAction.SET_KEY_DETAILS;
  payload: IKeyDetails | null;
} | {
  type: EAction.UPDATE_ACTIVE_MODIFIERS;
  payload: IKeyboardModifiers;
};

export type TModelDispatch = Dispatch<TModelAction>;
