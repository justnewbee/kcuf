export interface IDefaultParams {
  (): Record<string, unknown>;
}

export type TDefaultParams = Record<string, unknown> | IDefaultParams;

export interface IShouldIgnore {
  (): void | boolean;
}

/**
 * 真正发送请求的实现逻辑（以支持多平台的需求），注意必需用 POST
 */
export interface ILogSender {
  (trackUrl: string, body: string, headers: Record<string, string>): void;
}

/**
 * 用于在 flattenObject 的时候忽略部分属性
 *
 * - 默认忽略所有以 `_` 为前缀的属性
 * - `string` 等于 `key` 则忽略
 * - `string[]` 包含 `key` 则忽略
 * - 方法，可用 `path` 进行判断（注意这里的 `path` 和 `prefix` 没有关系）
 */
export type TFlattenIgnore = string | string[] | {
  (key: string, value: unknown, path: string): boolean;
};

export interface ISlsLogPayload {
  __topic__: string;
  [k: string]: unknown;
}

export interface ISlsPostBody {
  __topic__: string;
  __logs__: Record<string, string>[];
  // __source__?: string;
  // __tags__?: Record<string, string>;
}