# @kcuf/md5

An MD5 encrypting util.

## APIs

```ts
import md5, {
  md5String,
  md5Uint8Array,
  md5Buffer,
  md5Blob,
  md5Json
} from '@kcuf/md5';
```

| API | Description |
| --- | --- |
| `md5(input: unknown): string` | `input` can be `string`, `Buffer`, `Uint8Array` and anything else (which may not be hashed correctly though). |
| `md5String(input: string): string` | `input` is string |
| `md5Buffer(input: Buffer \| ArrayBuffer): string` | `input` is Buffer like object |
| `md5Blob(blob: Blob): Promise<string>` | `input` is a Blob object, note that it is async |
| `md5Json(o: unknown): string` | Generate MD5 on plain object, the JSON is stringify-ed in ordered manner, so the composing order is regardless  |
| `md5Unit8Array(uint8Array: Uint8Array): string` | The underneath md5 function |
