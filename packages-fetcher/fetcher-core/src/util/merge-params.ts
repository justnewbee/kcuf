import {
  TFetcherParamsMergeable
} from '../types';

import isInstanceofUrlSearchParams from './is-instanceof-url-search-params';
import cloneTypeUrlSearchParams from './clone-type-url-search-params';
import mergeTypeSearchParams from './merge-type-search-params';

export default function mergeParams(params1: TFetcherParamsMergeable, params2: TFetcherParamsMergeable): TFetcherParamsMergeable {
  if (isInstanceofUrlSearchParams(params1) || isInstanceofUrlSearchParams(params2)) {
    return mergeTypeSearchParams(cloneTypeUrlSearchParams(params1), cloneTypeUrlSearchParams(params2));
  }
  
  return {
    ...params2,
    ...params1
  };
}
