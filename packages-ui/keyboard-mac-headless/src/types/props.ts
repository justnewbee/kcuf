import {
  EKeyboardCode
} from '../enum';

import {
  IKeyboardModifiers
} from './common';

export interface IModelProps {
  /**
   * 是否监听键盘事件，默认 `true`，如果 `false`，可以通过 `codes` 和 `capsLock` 进行控制。
   */
  listen?: boolean;
  /**
   * 受控的 `activeCodes`
   */
  activeCodes?: EKeyboardCode[];
  /**
   * 是否对 Control / Alt / Shift / Meta / Fn 等键记录按下状态。
   */
  activeModifiers?: boolean | IKeyboardModifiers;
  /**
   * 将键盘事件的信息显示在空格键上，3s 后自动消失，默认 `true`。
   *
   * 注意，Mac 键盘在 CapsLock 的时候，按住 Shift 不会返回小写的 `key`，这里也不作纠正，如实反应。
   */
  detailsInSpace?: boolean;
  /**
   * 点击按钮的回调，当 `capsLock` 受控时，能够根据 `Shift` 正确返回大小写的 `key` 值，但不会根据 `Alt` 做出反应。
   */
  onKeyPress?(key: string, code: EKeyboardCode): void;
  /**
   * 配合 `activeModifiers` 的对象写法，可以实现受控。
   */
  onActiveModifiersChange?(activeModifiers: IKeyboardModifiers): void;
}
