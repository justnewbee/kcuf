export type TFnDefaultParams = () => Record<string, unknown>;

export type TDefaultParams = Record<string, unknown> | TFnDefaultParams;

export type TDontSend = () => undefined | boolean;

/**
 * 真正发送请求的实现逻辑（以支持多平台的需求），注意必需用 POST
 */
export type TLogSender = (trackUrl: string, body: string, headers: Record<string, string>) => void;

export type TFlattenPathTester = string | RegExp | (string | RegExp)[];

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
