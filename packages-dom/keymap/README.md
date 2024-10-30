# @kcuf/keymap

## 基础比较

| Package | Version | Size | Download | Star | TS | Demo | Test |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| [tinykeys] | 3.0.0/2024 | 1.48kB | 41k/Week | 3.8k | ✅ | [demo](https://jamiebuilds.github.io/tinykeys) | - |
| [hotkeys-js] | 3.13.7/2024 | 41.2kB | 363k/Week | 6.7k | ✍ | [demo](https://wangchujiang.com/hotkeys-js) | Jest |
| [keymaster] | 1.6.2/2014 | 8.58kB | 22k/Week | 6.5k | DT |  | - |
| [mousetrap] | 1.6.5/2019 | 33.9kB | 400k/Week | 11.7k | DT |  | Mocha |
| [shortcutjs] | 1.6.0/2017 | 12.9kB | 6/Week | 28 | ✅ |  | Jest ★ |
| [hotkeys] | 1.0.0/2014 | 15.1kB | 150/Week | 3 | JS |  |  |

其中 hotkeys OO 思想过重，用起来非常麻烦，后续不做计较。

## 功能比较

| - | [tinykeys] | [hotkeys-js] | [keymaster] | [mousetrap] | [shortcutjs] |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 批量绑定 | ✅ 对象 | ✅ 逗号 | ✅ 逗号 | ✅ 数组 | ✅ 对象数组 |
| 支持序列（Combo） | ✅ | ❌ | ❌ | ✅ | ❌ |
| 安全解绑 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 暂停（pause/resume） | ❌ | ❌ | ❌ | ❌ | ✅ |
| preventDefault | ❌ | `return false` | `return false` | `return false` | `options` |
| stopPropagation | ❌ | `return false` | `return false` | `return false` | ❌ |
| 触发条件 | ❌ | ❌ | ❌ | ❌ | ❌ |
| 便捷绑定（`? *` 等） | ❌ | ❌ | ❌ | ✅ | ❌ |
| 代码触发（trigger） | ❌ | ✅ | ❌ | ✅ | ❌ |
| 符号 Modifiers（⇧⌥⌃⌘） | ❌ | ✅ | ✅ | ❌ | ❌ |

[tinykeys]: https://www.npmjs.com/package/tinykeys
[hotkeys-js]: https://www.npmjs.com/package/hotkeys-js
[keymaster]: https://www.npmjs.com/package/keymaster
[mousetrap]: https://www.npmjs.com/package/mousetrap
[shortcutjs]: https://www.npmjs.com/package/shortcutjs
[hotkeys]: https://www.npmjs.com/package/hotkeys

## 符号

| 符号 | `key` | `code` | ~~`keyCode`~~ |
| --- | --- | --- | --- |
| ⌃ | Control | ControlLeft / ControlRight | 17 |
| ⌥ | Alt | AltLeft / AltRight | 18 |
| ⇧ | Shift | ShiftLeft / ShiftRight | 16 |
| ⌘ | Meta | MetaLeft / MetaRight | 224 |
| ↑ | ArrowUp | ArrowUp | 38 |
| ↓ | ArrowDown | ArrowDown | 40 |
| ← | ArrowLeft | ArrowLeft | 37 |
| → | ArrowRight | ArrowRight | 39 |
| ⏎ / ↵ / ↩ | Enter | Enter | 13 |
| ␣ | Space | Space | 32 |
| ⎋ | Escape | Escape | 27 |
| ⇥ | Tab | Tab | 9 |
| ⇞ | PageUp | PageUp | ? |
| ⇟ | PageDown | PageDown | ? |
| ⌫ | Backspace | Backspace | 8 |
| ⌦ | Delete | Delete | 46 |

## FAQ

### ❓ 能否 `stopPropagation` 和 `preventDefault`？

可以。由绑定方法的返回值决定：

* `'stop'` → `e.stopPropagation()`
* `'prevent'` → `e.preventDefault()`
* `false` → `e.stopPropagation()` + `e.preventDefault()`
* 其他 → 什么都不做

### ❓能否在回调中拿到事件对象？

不能，不需要，也不安全。

### ❓ Mac 下 F11 无响应？

系统快捷键权限更高，接管不了。

### ❓ `Ctrl++` 不行？

不行。换 `Ctrl+=`。

### ❓ Combo 下使用 `+`？

可以。比如设置 `C + +`，可以在按键序列 `c` → `⇧=` → `⇧=` 时触发。