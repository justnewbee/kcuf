# @kcuf/rc-keyboard-mac

![@kcuf/rc-keyboard-mac](https://img.picui.cn/free/2024/10/31/672333c84d470.jpg)

Yet another MacKeyboard React component, inspired by `@uiw/react-mac-keyboard` with some improvements and modifications:

1. Listen to document keydown events and reflect status by default
2. Use `styled-components` as CSS solution
3. Less CSS code using data attributes selector instead of `nth` selector
4. Reduced hard coded sizing in CSS
5. Can tell Left or Right Control/Option/Shift/Meta
6. Can tell the difference between Backspace and Delete
7. Displays event details in the space bar by default
8. Ditched deprecated [keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) for [code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
9. An `onKeyPress` event which can reflect Shift state

## How to Use

```tsx
import Keyboard from '@kcuf/rc-keyboard-mac';

// default
<Keyboard />

// manually control keyboard
<Keyboard {...{
  listen: false,
  codes: ['TheFn', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
}} />
```

...that easy.

## Props

```ts
interface KeyboardProps extends HTMLAttributes<HTMLDivElement>, Partial<IKeyboardInfo> {
  /**
   * Default: true
   * 
   * By default, the component will listen to keydown event on document, and refect the status in the keyboard.
   * 
   * However, if you want to control the behavior, you can pass codes and capsLock props.
   */
  listen?: boolean;
  /**
   * Makes some keys on by passing in codes.
   * 
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
   */
  codes?: string[];
  /**
   * Make CapsLock key on.
   */
  capsLock?: boolean;
  /**
   * Default: true
   * 
   * Display current keydown event details in the space key, the info will disappear automatically after 3s.
   */
  displayEvent?: boolean;
  /**
   * Callback when click a key in the UI, can reflect whether Shift is on.
   */
  onKeyPress?(key: string, code: EKeyboardCode): void;
}
```

## FAQ

### `Fn` and `F11` cannot be listened?

No, cannot.

### How to highlight the `Fn` and `Power` key?

The key does not have a code actually, use `TheFn` and `Power` in `props.codes`, like the example code above.
