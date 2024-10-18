import {
  TFetcherParamsMergeable
} from '../types';

import cloneTypeSearchParams from './clone-type-search-params';
import mergeTypeSearchParams from './merge-type-search-params';

export default function mergeParams(params1: TFetcherParamsMergeable, params2: TFetcherParamsMergeable): TFetcherParamsMergeable {
  if (params1 instanceof URLSearchParams || params2 instanceof URLSearchParams) {
    return mergeTypeSearchParams(cloneTypeSearchParams(params1), cloneTypeSearchParams(params2));
  }
  
  return {
    ...params2,
    ...params1
  };
}
