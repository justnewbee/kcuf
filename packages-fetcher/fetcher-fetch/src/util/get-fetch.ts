import unfetch from 'unfetch';

import {
  getWindow
} from '@kcuf/sandbox-escape';

let theFetch: WindowOrWorkerGlobalScope['fetch'] | undefined;

export default function getFetch(): WindowOrWorkerGlobalScope['fetch'] {
  if (theFetch) {
    return theFetch;
  }
  
  // 使用 iframe about:blank 做 sandbox 的时候会有这种情况，需要用顶层 fetch，否则 referrer 会是空
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  theFetch = getWindow().fetch ?? globalThis.fetch ?? unfetch as unknown as WindowOrWorkerGlobalScope['fetch'];
  
  return theFetch;
}
