import {
  IMarkingItemClass
} from '../types';

/**
 * 排好序的 `MarkingItem` 列表（不影响 `this.markingItems`），如下排序：
 *
 * 数组头，先画，底部
 * 1. `noHover`
 * 2. `noClick`
 * 3. 面积大
 * 4. 面积小
 * 5. ~~编辑中~~ 不考虑
 * 6. 线
 * 7. 点
 * 数组尾，后画，顶层
 *
 * 若给定 `reversed` 则给出反向数组
 */
export default function sortMarkingItems<T>(markingItems: IMarkingItemClass<T>[], reversed?: boolean): IMarkingItemClass<T>[] {
  const sortedItems = [...markingItems].sort((v1, v2) => {
    const v1Stats = v1.stats;
    const v2Stats = v2.stats;
    const v1Points = v1Stats.path.length;
    const v2Points = v2Stats.path.length;
    
    if (v1Stats.noHover) {
      return -1;
    }
    
    if (v2Stats.noHover) {
      return 1;
    }
    
    if (v1Points === 1 && v2Points > 1) {
      return 1;
    }
    
    if (v2Points === 1 && v1Points > 1) {
      return -1;
    }
    
    if (v1Points === 2 && v2Points > 2) {
      return 1;
    }
    
    if (v2Points === 2 && v1Points > 2) {
      return -1;
    }
    
    // if (v1.stats.editing) {
    //   return 1;
    // }
    //
    // if (v2.stats.editing) {
    //   return -1;
    // }
    
    return v2.stats.area - v1.stats.area;
  });
  
  return reversed ? sortedItems.reverse() : sortedItems;
}
