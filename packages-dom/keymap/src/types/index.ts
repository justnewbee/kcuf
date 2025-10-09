import {
  EModifierKey
} from '../enum';

export interface IKeybinding {
  key: string;
  modifiers?: EModifierKey[];
  caseSensitive?: boolean;
}

/**
 * 事件绑在哪个 DOM 上，默认 `window`，也可以指定为 `document`（和 `window` 等价）或特定 DOM
 */
export type TKeymapTarget = Window | Document | HTMLElement;

/**
 * 返回解绑用的无参方法
 */
export type TKeymapUnbind = () => void;

/**
 * 命中快捷键的回调，根据返回值的类型决定事件是否继续冒泡或触发默认行为：
 *
 * - `'stop'` → 调用 `e.stopPropagation()` 阻止事件冒泡
 * - `'prevent'` → 调用 `e.preventDefault()` 阻止默认行为（浏览器自带快捷键等）
 * - `false` → 调用 `e.stopPropagation()` + `e.preventDefault()`
 * - 其他 → 什么都不做
 */
export type TKeymapCallback = () => void | boolean | 'stop' | 'prevent';

export interface IKeymapOptions {
  /**
   * 是否使用 `keyup` 事件，默认用 `keydown` 事件，不会用到其他事件，`keypress` 已经被标注弃用，因此也不会再支持
   */
  keyup?: boolean;
  /**
   * 是否使用事件捕获阶段，默认 `true`
   */
  capture?: boolean;
  /**
   * 是否大小写敏感，仅对 a-zA-Z 有效，默认 `false` 不敏感
   */
  caseSensitive?: boolean;
  /**
   * Combo 的超时设置，默认 1000ms
   *
   * **Note:** 不建议太小，比如 300 就可能对大多数用户来说太快了
   */
  timeout?: number;
  /**
   * 适时忽略，用以动态判断不需要触发的场景，比如绑定了全局 ⌘Z 的时候，需要在输入组件（input、textarea、contenteditable）内忽略，
   * 用 `e.target` 进行实时判断，有时甚至可能需要向上查找到特定的容器组件
   */
  ignore?(e: KeyboardEvent): boolean | void;
}

export type TKeymapBatch = Record<string, TKeymapCallback | [TKeymapCallback, IKeymapOptions?]>;
