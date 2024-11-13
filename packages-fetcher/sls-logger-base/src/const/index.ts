/**
 * 合并日志的最外层的 topic
 */
export const TOPIC_MERGED = 'SLS_MERGED';

/**
 * 定死的 API 版本，GET 的时候为参数 `APIVersion`，POST 的时候为 header `x-log-apiversion`
 */
export const API_VERSION = '0.6.0';

export const PIPE_SILENT_TIME = 5000;

export const PIPE_WAIT_TIME = 200;

export const PIPE_MAX_CHUNK = 50;
