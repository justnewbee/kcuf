import {
  TFetcherBodyMergeable
} from '../types';

import cloneTypeFormData from './clone-type-form-data';
import cloneTypeSearchParams from './clone-type-search-params';
import mergeTypeFormData from './merge-type-form-data';
import mergeTypeSearchParams from './merge-type-search-params';

/**
 * 合并 body1 和 body2，返回类型的优先级为 FormData > URLSearchParams > 普通对象
 *
 * body1 的优先级高于 body2，是因为前面的参数，要么是调用时候传入，要么是优先级高（排在前边）的拦截器加的
 */
export default function mergeBody(body1: TFetcherBodyMergeable, body2: TFetcherBodyMergeable): TFetcherBodyMergeable {
  if (body1 instanceof FormData || body2 instanceof FormData) {
    return mergeTypeFormData(cloneTypeFormData(body1), cloneTypeFormData(body2));
  }
  
  if (body1 instanceof URLSearchParams || body2 instanceof URLSearchParams) {
    return mergeTypeSearchParams(cloneTypeSearchParams(body1), cloneTypeSearchParams(body2));
  }
  
  return {
    ...body2,
    ...body1
  };
}
