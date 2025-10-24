# @kcuf/cookie

Yet... another 饼干的获取和操作工具

## INSTALL

```shell
tnpm i @kcuf/cookie -S
```

## APIs

* `function cookieAll(): Record<string, string>`
* `function cookieGet(name: string): string | undefined`
* `function cookieSet(name: string, value: unknown, options?: CookieSetOptions): void`
* `function cookieDelete(name: string, options?: CookieDeleteOptions): void`

## cookieAll

获取当前页面可以访问到的全部 Cookie。

```ts
function cookieAll(): Record<string, string>;
```

## cookieGet

获取单个 Cookie

```ts
function cookieGet(name: string): string | undefined;
```

## cookieSet

设置 Cookie，默认为时间为 180 天

* `value` 为 `undefined|null` 等效于 `cookieDelete`
* `options.days` 为 0 可以保存为 Session Cookie

```ts
function cookieSet(name: string, value: unknown, options: {
  domain?: string; // 默认为当前页面的二级域名，如 `.aliyun.com`，如果是 IP 则为 IP，如 `127.0.0.1`
  path?: string; // 默认 '/'
  days?: number; // 默认 180，传入 `days: 0` 成为 session cookie
  encoding?: boolean; // 默认 true，传入 `false` 可保存原始的值（比如 value 已经经过 base64 编码过）
} = {}): void;
```

## cookieDelete

删除 cookie，其实设置一个过期时间为此刻之前的时间，浏览器会自动清理过期的 cookie

```ts
function cookieDelete(name: string, options: {
  domain?: string;
  path?: string;
} = {}): void;
```

## SameSite + Secure 以及 HTTPS 和 Iframe 的影响

以下条件下：

* 协议
  + `http://`
  + `https://`
* iframe
  + 无
  + 不跨域
  + 跨子域
  + 跨全域

SameSite 和 Secure 各值：

* SameSite
  + undefined
  + Lax
  + Strict
  + None
* Secure
  + true
  + false

在各个浏览器：

* 浏览器
  + Firefox
  + Chrome
  + Safari

下对 set cookie 的影响。

### 测试脚本

注意，在 Iframe 下，需通过浏览器的 Console 切换到对应的 Iframe 上下文。

```javascript
(() => {
  function cookieSet(name, value, {
    path = '/',
    sameSite,
    secure
  } = {}) {
    const parts = [
      `${name}=${encodeURIComponent(value)}`,
      // `domain=${domain}`,
      `path=${path}`
    ];
    
    if (sameSite !== undefined) {
      parts.push(`sameSite=${sameSite}`);
    }
    
    if (secure !== undefined) {
      parts.push(`secure=${secure}`);
    }
    
    document.cookie = parts.join('; ');
  }
  
  function cookieGet(name) {
    return document.cookie.split(/\s*;\s*/).reduce((result, v) => {
      const [cookieName, cookieValue] = v.split('=');
      
      try {
        result[cookieName] = decodeURIComponent(cookieValue);
      } catch (err) {
      }
      
      return result;
    }, {})[name];
  }
  
  const TIME = Date.now();
  
  const ITEMS = [undefined, 'Lax', 'Strict', 'None'].reduce((result, sameSite) => {
    [undefined, true, false].forEach(secure => {
      const name = `TEST_SameSite_${sameSite}__Secure_${secure}`;
      const value = `${sameSite}_${secure}_${TIME}`;
      
      cookieSet(name, value, {
        sameSite,
        secure
      });
      
      const valueGet = cookieGet(name);
      
      result.push({
        name,
        value,
        valueGet,
        sameSite,
        secure,
        result: valueGet === value ? '✅' : '❌'
      });
    });
    
    return result;
  }, []);
  
  console.table(ITEMS, ['sameSite', 'secure', 'result']);
})();
```

### HTTP 非 Iframe

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ✅      | ✅      |
| `undefined`  | `true`      | ❌       | ❌      | ❌      |
| `undefined`  | `false`     | ❌       | ❌      | ❌      |
| Lax          | `undefined` | ✅       | ✅      | ✅      |
| Lax          | `true`      | ❌       | ❌      | ❌      |
| Lax          | `false`     | ❌       | ❌      | ❌      |
| Strict       | `undefined` | ✅       | ✅      | ✅      |
| Strict       | `true`      | ❌       | ❌      | ❌      |
| Strict       | `false`     | ❌       | ❌      | ❌      |
| None         | `undefined` | ❌       | ❌      | ✅      |
| None         | `true`      | ❌       | ❌      | ❌      |
| None         | `false`     | ❌       | ❌      | ❌      |

### HTTP Iframe 不跨域

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ✅      | ✅      |
| `undefined`  | `true`      | ❌       | ❌      | ❌      |
| `undefined`  | `false`     | ❌       | ❌      | ❌      |
| Lax          | `undefined` | ✅       | ✅      | ✅      |
| Lax          | `true`      | ❌       | ❌      | ❌      |
| Lax          | `false`     | ❌       | ❌      | ❌      |
| Strict       | `undefined` | ✅       | ✅      | ✅      |
| Strict       | `true`      | ❌       | ❌      | ❌      |
| Strict       | `false`     | ❌       | ❌      | ❌      |
| None         | `undefined` | ❌       | ❌      | ✅      |
| None         | `true`      | ❌       | ❌      | ❌      |
| None         | `false`     | ❌       | ❌      | ❌      |

### HTTP（Iframe 跨子域）

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ✅      | ✅      |
| `undefined`  | `true`      | ❌       | ❌      | ❌      |
| `undefined`  | `false`     | ❌       | ❌      | ❌      |
| Lax          | `undefined` | ✅       | ✅      | ✅      |
| Lax          | `true`      | ❌       | ❌      | ❌      |
| Lax          | `false`     | ❌       | ❌      | ❌      |
| Strict       | `undefined` | ✅       | ✅      | ✅      |
| Strict       | `true`      | ❌       | ❌      | ❌      |
| Strict       | `false`     | ❌       | ❌      | ❌      |
| None         | `undefined` | ❌       | ❌      | ✅      |
| None         | `true`      | ❌       | ❌      | ❌      |
| None         | `false`     | ❌       | ❌      | ❌      |

### HTTP（Iframe 跨全域）

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ❌       | ❌      | ❌      |
| `undefined`  | `true`      | ❌       | ❌      | ❌      |
| `undefined`  | `false`     | ❌       | ❌      | ❌      |
| Lax          | `undefined` | ❌       | ❌      | ❌      |
| Lax          | `true`      | ❌       | ❌      | ❌      |
| Lax          | `false`     | ❌       | ❌      | ❌      |
| Strict       | `undefined` | ❌       | ❌      | ❌      |
| Strict       | `true`      | ❌       | ❌      | ❌      |
| Strict       | `false`     | ❌       | ❌      | ❌      |
| None         | `undefined` | ❌       | ❌      | ❌      |
| None         | `true`      | ❌       | ❌      | ❌      |
| None         | `false`     | ❌       | ❌      | ❌      |

### HTTPS 非 Iframe

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ✅      | ✅      |
| `undefined`  | `true`      | ✅       | ✅      | ✅      |
| `undefined`  | `false`     | ✅       | ✅      | ✅      |
| Lax          | `undefined` | ✅       | ✅      | ✅      |
| Lax          | `true`      | ✅       | ✅      | ✅      |
| Lax          | `false`     | ✅       | ✅      | ✅      |
| Strict       | `undefined` | ✅       | ✅      | ✅      |
| Strict       | `true`      | ✅       | ✅      | ✅      |
| Strict       | `false`     | ✅       | ✅      | ✅      |
| None         | `undefined` | ❌       | ❌      | ✅      |
| None         | `true`      | ✅       | ✅      | ✅      |
| None         | `false`     | ✅       | ✅      | ✅      |

### HTTPS 在 Iframe 下（不跨域）

`a.com` 页面通过 Iframe 内嵌 `a.com` 页面，在内层 `a.com` 页面上进行测试。

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ✅      | ✅      |
| `undefined`  | `true`      | ✅       | ✅      | ✅      |
| `undefined`  | `false`     | ✅       | ✅      | ✅      |
| Lax          | `undefined` | ✅       | ✅      | ✅      |
| Lax          | `true`      | ✅       | ✅      | ✅      |
| Lax          | `false`     | ✅       | ✅      | ✅      |
| Strict       | `undefined` | ✅       | ✅      | ✅      |
| Strict       | `true`      | ✅       | ✅      | ✅      |
| Strict       | `false`     | ✅       | ✅      | ✅      |
| None         | `undefined` | ❌       | ❌      | ✅      |
| None         | `true`      | ✅       | ✅      | ✅      |
| None         | `false`     | ✅       | ✅      | ✅      |

### HTTPS 在 Iframe 下（跨子域）

`xx.a.com` 页面通过 Iframe 内嵌 `yy.a.com` 页面，在 `yy.a.com` 页面上进行测试。

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ❌      | ✅      |
| `undefined`  | `true`      | ✅       | ❌      | ✅      |
| `undefined`  | `false`     | ✅       | ❌      | ✅      |
| Lax          | `undefined` | ❌       | ❌      | ✅      |
| Lax          | `true`      | ❌       | ❌      | ✅      |
| Lax          | `false`     | ❌       | ❌      | ✅      |
| Strict       | `undefined` | ❌       | ❌      | ✅      |
| Strict       | `true`      | ❌       | ❌      | ✅      |
| Strict       | `false`     | ❌       | ❌      | ✅      |
| None         | `undefined` | ❌       | ❌      | ✅      |
| None         | `true`      | ✅       | ✅      | ✅      |
| None         | `false`     | ✅       | ✅      | ✅      |

### HTTPS 在 Iframe 下（跨全域）

`a.com` 页面通过 Iframe 内嵌 `b.com` 页面，在 `b.com` 页面上进行测试。

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ❌      | ❌      |
| `undefined`  | `true`      | ✅       | ❌      | ❌      |
| `undefined`  | `false`     | ✅       | ❌      | ❌      |
| Lax          | `undefined` | ❌       | ❌      | ❌      |
| Lax          | `true`      | ❌       | ❌      | ❌      |
| Lax          | `false`     | ❌       | ❌      | ❌      |
| Strict       | `undefined` | ❌       | ❌      | ❌      |
| Strict       | `true`      | ❌       | ❌      | ❌      |
| Strict       | `false`     | ❌       | ❌      | ❌      |
| None         | `undefined` | ❌       | ❌      | ❌      |
| None         | `true`      | ✅       | ✅      | ❌      |
| None         | `false`     | ✅       | ✅      | ❌      |

## 总结

HTTP 下，非 Iframe、Iframe 不跨域、Iframe 跨子域（跨全域都不行）成功的测试用例：

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| `undefined`  | `undefined` | ✅       | ✅      | ✅      |
| Lax          | `undefined` | ✅       | ✅      | ✅      |
| Strict       | `undefined` | ✅       | ✅      | ✅      |

HTTPS 下，非 Iframe、Iframe 不跨域、Iframe 跨子域、Iframe 跨全域（Safari 都不行）成功的测试用例：

| SameSite     | Secure      | Firefox | Chrome | Safari |
|--------------|-------------|---------|--------|--------|
| None         | `true`      | ✅       | ✅      | ✅      |
| None         | `false`     | ✅       | ✅      | ✅      |

默认逻辑：

1. 若 HTTP，则 `SameSite` 和 `secure` 不设置
2. 若 HTTPS，则 `sameSite=None; secure=true`（前提是使用者不设置 `sameSite` 和 `secure`）
