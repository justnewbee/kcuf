import {
  produce
} from 'immer';

import {
  IModelState,
  TTogglePluginPayload
} from '../types';

export default function reduceTogglePlugin(state: IModelState, payload: TTogglePluginPayload): IModelState {
  return produce(state, draft => {
    draft.plugins[payload] = !draft.plugins[payload];
  });
}
