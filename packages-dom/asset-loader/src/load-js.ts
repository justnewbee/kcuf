import {
  ILoadJsOptions
} from './types';

const LOADING_MAP = new Map<string, Promise<void>>();

/**
 * 一个兼顾并发请求的 JS 加载器
 */
export default async function loadJs(url: string, options?: ILoadJsOptions): Promise<void> {
  const ongoingPromise = LOADING_MAP.get(url);
  
  if (ongoingPromise) {
    return ongoingPromise;
  }
  
  const {
    timeout = 10_000
  } = options ?? {};
  const promise = new Promise<void>((resolve, reject) => {
    const el = document.createElement('script');
    
    el.src = url;
    el.async = true; // 异步加载（不阻塞页面渲染）
    el.defer = true; // 延迟执行（确保 DOM 解析完成后执行）
    
    const timeoutTimer = timeout > 0 ? setTimeout(() => {
      cleanup(); // eslint-disable-line no-use-before-define
      reject(new Error(`Script load timeout ${timeout}ms: ${url}`));
    }, timeout) : null;
    
    const onLoad = (): void => {
      cleanup(); // eslint-disable-line no-use-before-define
      resolve();
    };
    
    const onError = (): void => {
      cleanup(); // eslint-disable-line no-use-before-define
      reject(new Error(`Script load failed: ${url}`));
    };
    
    function cleanup(): void {
      LOADING_MAP.delete(url);
      
      el.removeEventListener('load', onLoad);
      el.removeEventListener('error', onError);
      
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
      
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
      }
    }
    
    el.addEventListener('load', onLoad);
    el.addEventListener('error', onError);
    
    document.head.appendChild(el);
  });
  
  LOADING_MAP.set(url, promise);
  
  return promise;
}
