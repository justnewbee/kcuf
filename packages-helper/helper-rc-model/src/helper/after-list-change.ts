import {
  TListChangeReason,
  TFindPredicate
} from '../types';
import {
  afterListUpdate,
  afterListDelete
} from '../util';

/**
 * 在全列表中，增删改（`c u d`）等操作完成后立即刷新维护在组件 `state` 中的列表数据，这是一个高频且常规的事务。
 *
 * 此帮助方法用以规范此类操作的 Action 和 Reducer，并减少不必要的模式代码。
 *
 * Dispatcher 例子（不一定非这么写）：
 *
 * ```ts
 * dispatch({
 *  type: EnumAction.AFTER_XX_CHANGE,
 *  payload, // T
 *  reason: 'c' | 'u' | 'd' // 新建 / 更新 / 删除，建议将 `reason` 和 `payload` 分开
 * });
 * ```
 *
 * Reducer 例子（不一定非用 `immer`）：
 *
 * ```ts
 * import {
 *   produce
 * } from 'immer';
 *
 * export default function reduceAfterXxChange(state: IModelState, payload: T, reason: ChangeReason): IModelState {
 *   return produce(state, draft => {
 *     const list = draft.xx... // 保证 list 存在
 *
 *     muteListAfterItemChange(list, payload, reason); // 简单比较，适用于原始类型，不建议对象使用
 *     muteListAfterItemChange(list, payload, reason, 'id'); // 使用属性查找（90% 场景适用）
 *     muteListAfterItemChange(list, payload, reason, v => v.id === payload.id || v.xxId === payload.xxId); // 或方法判断
 *   });
 * }
 * ```
 */
export default function afterListChange<T>(list: T[], payload: T, reason: TListChangeReason, predicate?: TFindPredicate<T>): void {
  switch (reason) {
  case 'c':
    list.push(payload);
    
    break;
  case 'u':
    afterListUpdate(list, payload, predicate);
    
    break;
  case 'd':
    afterListDelete(list, payload, predicate);
    
    break;
  default:
    break;
  }
}
