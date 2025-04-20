import {
  IFetchSseOptions,
  IFetchSseResult
} from './types';
import {
  isContentTypeEventStream,
  createFetchSseErrorResponseContentType,
  createFetchSseErrorResponseStatus,
  createFetchSseErrorResponseNoBody
} from './util';

/**
 * EventSource 能力的 fetch 实现 - 不是 Polyfill
 *
 * 🎈 为什么写这个，而为什么不用 EventSource 或 EventSourcePolyfill？
 *
 * 1. 原生 EventSource 只有一个 `withCredentials` 参数，不接收 `headers`，而我们的接口需要
 * 2. Polyfill 有个会循环启动的 BUG
 * 3. Polyfill 版本代码臃肿，有较多过时的逻辑
 *
 * 参考：
 *
 * - SSE → https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
 * - EventSource → https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 * - EventSourcePolyfill → https://github.com/Yaffle/EventSource
 */
export default function fetchSse(url: string, options: IFetchSseOptions = {}): IFetchSseResult {
  const controller = new AbortController();
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  
  const {
    headers,
    onOpen,
    onChunk,
    onCancel,
    ...restOptions
  } = options;
  
  const promise = fetch(url, {
    headers: {
      ...headers,
      Accept: 'text/event-stream'
    },
    ...restOptions,
    signal: controller.signal
  }).then((response): Promise<void> => {
    if (response.status !== 200) {
      throw createFetchSseErrorResponseStatus(response);
    }
    
    const contentType = response.headers.get('Content-Type') || '';
    
    if (!isContentTypeEventStream(contentType)) {
      throw createFetchSseErrorResponseContentType(contentType);
    }
    
    onOpen?.();
    
    reader = response.body?.getReader();
    
    if (!reader) {
      throw createFetchSseErrorResponseNoBody();
    }
    
    return new Promise<void>((resolve, reject) => {
      function readNextChunk(): void {
        reader?.read().then(result => {
          if (result.done) {
            resolve(); // Note: bytes in TextDecoder are ignored
          } else {
            onChunk?.(result.value);
            readNextChunk();
          }
        }).catch((error: Error) => {
          reject(error);
        });
      }
      
      readNextChunk();
    });
  });
  
  return {
    promise,
    cancel(): void {
      reader?.cancel(); // https://bugzilla.mozilla.org/show_bug.cgi?id=1583815
      controller.abort();
      onCancel?.();
    }
  };
}
