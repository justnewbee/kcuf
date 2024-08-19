export type TSize = [number, number]; // 大小 [width, height]

// 查找 MarkingItem 的方式，数字可以表示上几个下几个（不接受 0），回调方法可以根据 data 找到特定 MarkingItem
export type TMarkingItemFinder<T> = number | ((data: T) => boolean);
