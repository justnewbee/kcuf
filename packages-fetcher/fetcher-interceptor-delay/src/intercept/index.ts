import {
  Fetcher
} from '@kcuf/fetcher';

interface IWin extends Window {
  __FETCHER_DELAY?: number;
}

/**
 * 有时候为了测试界面上一闪而过的 Loading 可以通过在控制台设置全局变量 `__FETCHER_DELAY` 的方式
 */
export default function intercept(fetcher: Fetcher): () => void {
  return fetcher.interceptRequest(() => {
    const delay = (window as IWin).__FETCHER_DELAY;
    
    if (delay && delay > 0) {
      return new Promise(resolve => {
        setTimeout(resolve, delay);
      });
    }
  }, 1);
}
