# @kcuf/base64

Base64 url-safe encode/decode.

## Why

The two Base64 related functions are now widely available in modern browsers:

* [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa) for encoding
* [atob](https://developer.mozilla.org/en-US/docs/Web/API/Window/atob) for decoding

However, `btoa` does not support Unicode now, any of these will break:

* `btoa('中文')`
* `btoa('💥')`

That's why this package is used.

* 不支持 unicode，汉字和 Emoji 等会报错
  - FF → `DOMException: String contains an invalid character`
  - CH → `DOMException: Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1 range.`
  - SF → `InvalidCharacterError: The string contains invalid characters.`

* 这两个方法有些奇怪，可以把它从 window 上脱离出来调用，但不能把它挂到某对象下面调用，否则会报错
  - FF → `TypeError: 'atob' called on an object that does not implement interface Window`
  - CH → `TypeError: Illegal invocation`
  - SF → `TypeError: Can only call Window.btoa on instances of Window`

## How to Use

### encode

```ts
import {
  encode
} from '@kcuf/base64';

encode(stringToEncode);
encode(stringToEncode, true); // url-safe
```

### decode

```ts
import {
  decode
} from '@kcuf/base64';

decode(stringEncoded);
```
