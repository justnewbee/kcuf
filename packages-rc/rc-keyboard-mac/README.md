# @kcuf/rc-keyboard-mac

Yet another MacKeyboard react component, inspired by `@uiw/react-mac-keyboard` with some improvements and modifications:

1. Listen to document keydown events and reflect status by default
2. Use `styled-components` as CSS solution
3. Less CSS code using data attributes selector instead of `nth` selector
4. Can tell Left or Right Control/Option/Shift/Meta
5. Can tell the difference between Backspace and Delete
6. Ditched deprecated [keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) for [code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

## How to Use

```tsx
import KeyboardMac from '@kcuf/rc-keyboard-mac';

// default
<KeyboardMac />

// manually control keyboard
<KeyboardMac {...{
  listen: false,
  codes: ['TheFn', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
}} />
```

...that easy.

## Props

```ts
interface KeyboardMacProps extends HTMLAttributes<HTMLDivElement>, Partial<IKeyboardInfo> {
  /**
   * By default, the component will listen to keydown event on document, and refect the status in the keyboard.
   * 
   * However, if you want to control the behavior, you can pass codes and capsLock props.
   */
  listen?: boolean;
  /**
   * Keyboard
   * 
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
   */
  codes?: string[];
  capsLock?: boolean;
}
```

## Known Issues

### `Fn` and `F11` cannot be listened

No, cannot.

### How to highlight the `Fn` key?

The key does not have a code actually, use `TheFn` in `props.codes`, like the example code above.
