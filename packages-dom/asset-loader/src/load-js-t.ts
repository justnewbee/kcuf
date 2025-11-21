import {
  ILoadJsOptions
} from './types';
import loadJs from './load-js';

/**
 * 加载有全局污染的 JS，并发保护
 */
export default async function loadJsT<O extends object, K extends keyof O>(url: string, globalName: K, options?: ILoadJsOptions): Promise<O[K]> {
  return (window as unknown as O)[globalName] ?? loadJs(url, options).then(() => {
    const g = (window as unknown as O)[globalName];
    
    if (g) {
      return g;
    }
    
    throw new Error(`Global var ${globalName as string} not found after load: ${url}`);
  });
}
