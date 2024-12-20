import _isPlainObject from 'lodash/isPlainObject';
import _isArray from 'lodash/isArray';
import _cloneDeep from 'lodash/cloneDeep';

/**
 * 有些场景或拦截器需要对响应数据进行克隆，但如果 clone 了 Blob 会成为一个空的 plain 对象，所以封一个简单的
 * 帮助方法，对且仅对普通对象或数组进行克隆（简单数据不需要）
 */
export default function cloneResponseData<T = unknown>(responseData: T): T {
  return _isPlainObject(responseData) || _isArray(responseData) ? _cloneDeep(responseData) : responseData;
}
