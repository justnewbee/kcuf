# @kcuf/base64

Base64 url-safe encode/decode.

## Why

The two Base64 related functions are now widely available in modern browsers:

* [btoa](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa) for encoding
* [atob](https://developer.mozilla.org/en-US/docs/Web/API/Window/atob) for decoding

However, `btoa` does not support Unicode now, any of these will break:

* `btoa('中文')`
* `btoa('💥')`

> DOMException: String contains an invalid character

That's why this package is used.

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
