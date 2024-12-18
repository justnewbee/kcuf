import {
  IFetcherConfig
} from '../types';
import {
  generateConfigId
} from '../util';

/**
 * 默认的第一个 Request 拦截器
 *
 * - 创建 `id`（可以被后续拦截器用于缓存、合并等骚操作）
 * - 保证 `method` 存在且大写
 */
export default function interceptRequestFirst(config: IFetcherConfig): Partial<IFetcherConfig> {
  const method = config.method?.toUpperCase() || 'GET';
  
  config.method = method; // 设进去，为了 _id...
  
  return {
    _id: generateConfigId(config),
    method
  };
}
