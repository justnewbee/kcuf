import {
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';
import {
  JSDOM
} from 'jsdom';

import fetcherJsonp from '../src';

describe('fetcherJsonp', () => {
  let dom: JSDOM;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html lang="en"><head><title>JsDom</title></head><body></body></html>', {
      resources: 'usable',
      runScripts: 'dangerously'
    });

    (global as Record<string, unknown>).window = dom.window;
    (global as Record<string, unknown>).document = dom.window.document;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    dom.window.close();

    delete (global as Record<string, unknown>).window;
    delete (global as Record<string, unknown>).document;
  });

  // 模拟 script 加载：src 被赋值时，根据 URL 决定触发回调或 onerror
  function setupScriptMock(responseData: Record<string, unknown> = {}): void {
    const doc = document;
    const originalCreateElement = doc.createElement.bind(doc);

    vi.spyOn(doc, 'createElement').mockImplementation((tagName: string) => {
      const el = originalCreateElement(tagName);

      if (tagName.toLowerCase() !== 'script') {
        return el;
      }

      let srcValue = '';

      Object.defineProperty(el, 'src', {
        get: () => srcValue,
        set: (value: string) => {
          srcValue = value;

          const match = value.match(/[?&](?:[^=&]+)=([^&]+)$/);

          if (!match) {
            return;
          }

          const callbackName = match[1];

          // /api/ 路径或相对路径触发 onerror
          if (!value.startsWith('http') || value.includes('/api/')) {
            setTimeout(() => {
              (el as HTMLScriptElement).onerror?.(new Event('error'));
            }, 0);

            return;
          }

          // 根据 URL 找对应响应
          const urlKey = Object.keys(responseData).find(k => value.includes(k));
          const result = urlKey ? responseData[urlKey] : undefined;

          if (result !== undefined) {
            setTimeout(() => {
              const win = window as unknown as Record<string, (r: unknown) => void>;

              win[callbackName]?.(result);
            }, 10);
          }
          // 若无匹配响应，不触发 callback 也不触发 onerror → 超时
        },
        configurable: true
      });

      return el;
    });
  }

  const JSONP_URL = 'https://example.com/jsonp?who=boshit&love=wlp';
  const JSONP_RESULT = {
    who: 'boshit',
    love: 'wlp'
  };

  test('will be invoked', () => {
    const mockFn = vi.fn();

    mockFn(JSONP_URL);
    mockFn(JSONP_URL);
    mockFn(JSONP_URL);

    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  test('.then(response => response.json()) will get the JSON object', async () => {
    setupScriptMock({ 'example.com': JSONP_RESULT });

    await expect(fetcherJsonp(JSONP_URL).then(r => r.json())).resolves.toEqual(JSONP_RESULT);
  });

  test('404 will trigger network error', async () => {
    setupScriptMock();

    await expect(fetcherJsonp('/api/404', {
      timeout: 5000
    })).rejects.toThrowError('fetcher-jsonp network failure, url = /api/404');

    await expect(fetcherJsonp('/api/404', {
      timeout: 5000
    })).rejects.toHaveProperty('name', 'JsonpError.Network');
  });

  test('unreachable url will timeout', async () => {
    // 不配置响应，script 既不回调也不 onerror → 触发超时
    setupScriptMock();

    await expect(fetcherJsonp(JSONP_URL, {
      timeout: 100
    })).rejects.toThrowError(`fetcher-jsonp timeout, url = ${JSONP_URL}, timeout = 100ms`);

    await expect(fetcherJsonp(JSONP_URL, {
      timeout: 100
    })).rejects.toHaveProperty('name', 'JsonpError.Timeout');
  });

  test('custom callback, lifecycle and charset (success)', async () => {
    setupScriptMock({ 'example.com': JSONP_RESULT });

    const callbackFn = 'jsonp';
    const scriptQuery = `#jsonp-script-${callbackFn}`;
    const promise = fetcherJsonp(JSONP_URL, {
      jsonpCallbackFunction: callbackFn,
      charset: 'gb2312'
    }).then(r => r.json());

    // @ts-expect-error
    expect(window[callbackFn]).toBeTruthy();
    expect(document.querySelector(scriptQuery)).toBeTruthy();
    expect(document.querySelector(scriptQuery)?.getAttribute('charset')).toEqual('gb2312');
    expect(document.querySelector(scriptQuery)?.tagName).toEqual('SCRIPT');

    expect(await promise).toEqual(JSONP_RESULT);

    // @ts-expect-error
    expect(window[callbackFn]).toBeFalsy(); // cleared
    expect(document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });

  test('custom callback, lifecycle and charset (failure - network error)', async () => {
    setupScriptMock();

    const callbackFn = 'jsonp';
    const scriptQuery = `#jsonp-script-${callbackFn}`;
    const promise = fetcherJsonp('/api/404', {
      jsonpCallbackFunction: callbackFn,
      timeout: 5000
    }).then(r => r.json());

    // @ts-expect-error
    expect(window[callbackFn]).toBeTruthy();
    expect(document.querySelector(scriptQuery)).toBeTruthy();

    expect(await promise.catch(e => e)).toHaveProperty('name', 'JsonpError.Network');

    // @ts-expect-error
    expect(window[callbackFn]).toBeFalsy(); // cleared on network error (cleanup, not cleanupPrematurely)
    expect(document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });

  test('custom callback, lifecycle and charset (failure - timeout)', async () => {
    // 不配置响应，超时触发 cleanupPrematurely：callback 替换为 noop 而非删除
    setupScriptMock();

    const callbackFn = 'jsonp-timeout';
    const scriptQuery = `#jsonp-script-${callbackFn}`;
    const promise = fetcherJsonp(JSONP_URL, {
      jsonpCallbackFunction: callbackFn,
      timeout: 50
    }).then(r => r.json());

    // @ts-expect-error
    expect(window[callbackFn]).toBeTruthy();
    expect(document.querySelector(scriptQuery)).toBeTruthy();

    expect(await promise.catch(e => e)).toHaveProperty('name', 'JsonpError.Timeout');

    // by design: timeout 后 cleanupPrematurely 把 callback 设为 noop（仍 truthy）
    // @ts-expect-error
    expect(window[callbackFn]).toBeTruthy();
    expect(document.querySelector(scriptQuery)).toBeFalsy(); // cleared
  });

  test('can be aborted', async () => {
    const abortController = new AbortController();
    const promise = fetcherJsonp('/api/abort', {
      signal: abortController.signal
    });

    abortController.abort();

    await expect(promise).rejects.toThrowError('fetcher-jsonp abort, url = /api/abort');
    await expect(promise).rejects.toHaveProperty('name', 'AbortError');
  });

  test('can set callback param name', async () => {
    setupScriptMock({
      'example.com': JSONP_RESULT
    });

    await expect(fetcherJsonp(JSONP_URL, {
      jsonpCallback: 'jsonp'
    })).resolves.toMatchObject({
      ok: true,
      status: 200
    });
  });

  test('responseType: text', async () => {
    setupScriptMock({
      'example.com': JSONP_RESULT
    });

    await expect(fetcherJsonp(JSONP_URL, { jsonpCallback: 'jsonp' }).then(r => r.text())).resolves.toBeTypeOf('string');

    await expect(fetcherJsonp(JSONP_URL, {
      jsonpCallback: 'jsonp',
      jsonpCallbackFunction: 'text-only'
    }).then(r => r.text())).resolves.toBeTypeOf('string');
  });
});
