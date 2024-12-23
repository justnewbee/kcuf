# @kcuf-ui/rc-keyboard-mac

![@kcuf-ui/rc-keyboard-mac](https://img.picui.cn/free/2024/10/31/672333c84d470.jpg)

Yet another MacKeyboard React component, inspired by `@uiw/react-mac-keyboard` with some improvements and modifications:

1. Listen to document keydown events and reflect status by default
2. Can control active keys and modifiers
3. Use `styled-components` as CSS solution, reduced CSS size by using data attributes selector instead of `nth` selector, and reduced hard coded sizing in CSS
4. Can tell Left or Right Control/Option/Shift/Meta, and the difference between Backspace and Delete
5. Displays event details in the space bar by default
6. Ditched deprecated [keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) for [code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
7. An `onKeyPress` event which can reflect Shift state

## How to Use

```tsx
import Keyboard from '@kcuf-ui/rc-keyboard-mac';

// default
<Keyboard />
```

...that easy.

## Demos

[![Edit @kcuf-ui/rc-keyboard-mac](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/x4294z)

* 其他
  - [掘金](https://code.juejin.cn/pen/7431469243382071359)

## Props

All props are optional.

```ts
interface KeyboardProps extends HTMLAttributes<HTMLDivElement>, Partial<IKeyboardInfo> {
  /**
   * By default, the component will listen to keydown event on document, and refect the status in the keyboard.
   * 
   * 是否监听键盘事件，默认 `true`，如果 `false`，可以通过 `codes` 和 `capsLock` 进行控制。
   */
  listen?: boolean;
  /**
   * Controllable active codes, ref https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code.
   * 
   * 受控的 `activeCodes`
   */
  activeCodes?: EKeyboardCode[];
  /**
   * Whether Control / Alt / Shift / Meta / Fn can stay pressed before next click.
   * 
   * 是否对 Control / Alt / Shift / Meta / Fn 等键记录按下状态。
   */
  activeModifiers?: boolean | IKeyboardModifiers;
  /**
   * Whether (default true) to display current keydown details in the space key, the info will disappear automatically after 3s.
   * 
   * 将键盘事件的信息显示在空格键上，3s 后自动消失，默认 `true`。
   * 
   * 注意，Mac 键盘在 CapsLock 的时候，按住 Shift 不会返回小写的 `key`，这里也不作纠正，如实反应。
   */
  detailsInSpace?: boolean;
  /**
   * Callback when click a key in the UI, can reflect whether Shift is on.
   * 
   * 点击按钮的回调，当 `capsLock` 受控时，能够根据 `Shift` 正确返回大小写的 `key` 值，但不会根据 `Alt` 做出反应。
   */
  onKeyPress?(key: string, code: EKeyboardCode): void;
  /**
   * With `props.activeModifiers` in object format, can make it controllable.
   * 
   * 配合 `props.activeModifiers` 的对象写法，可以实现受控。
   */
  onActiveModifiersChange?(activeModifiers: IKeyboardModifiers): void;
}
```

## Known Issues

* `Fn` and `F11` cannot be listened
