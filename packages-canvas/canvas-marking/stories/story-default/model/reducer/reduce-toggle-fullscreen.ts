import {
  produce
} from 'immer';

import {
  IModelState
} from '../types';

export default function reduceToggleFullscreen(state: IModelState, payload = !state.fullscreen): IModelState {
  return produce(state, draft => {
    draft.fullscreen = payload;
  });
}
