/**
 * 更新 List 的原因：
 *
 * - c 新增，执行 `list.push(payload)`
 * - C 新增，执行 `list.unshift(payload)`
 * - u 更新，执行 `list.splice(index, 1, payload)` 替换
 * - d 删除，执行 `list.splice(index, 1)` 移除
 */
export type TListChangeReason = 'c' | 'C' | 'u' | 'd';

export type TFindPredicate<T> = keyof T | ((v: T) => unknown);
