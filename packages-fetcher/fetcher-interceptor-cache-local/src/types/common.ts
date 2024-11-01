export interface ICacheQueueItem {
  resolve(data: unknown): void;
  reject(err: Error): void;
}

export interface ICache<T = unknown> {
  /*
   * 缓存开始生效时间，请求成功的时候设置，如果 <= 0 则表示请求还没有完成
   */
  time: number;
  ttl: number;
  // 新加的缓存，因为请求尚未开始，是没有数据的，此时如果有多个相同的请求过来，要利用同一个缓存
  queue?: ICacheQueueItem[] | null;
  data?: T;
}

export type TCacheLocalGlobal = Record<string, ICache | null>;

export interface ICacheLocalWindow {
  __fetcher_cache_local__?: TCacheLocalGlobal;
}