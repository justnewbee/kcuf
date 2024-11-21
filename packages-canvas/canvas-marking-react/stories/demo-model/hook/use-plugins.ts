import {
  TStatePlugins
} from '../types';

import useModelState from './_use-model-state';

export default function usePlugins(): TStatePlugins {
  return useModelState().plugins;
}
