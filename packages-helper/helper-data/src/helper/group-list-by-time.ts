import {
  ETimeGroup
} from '../enum';
import {
  IGroupedListByTime
} from '../types';
import {
  startOfDay,
  startOfDayBefore
} from '../util';

interface IGroupByTimeOptions {
  /**
   * 自定义分组标题，未指定的分组沿用默认文案
   */
  titles?: Partial<Record<ETimeGroup, string>>;
  /**
   * 分组基准时间，默认当前时间；传入固定值可让结果可预测
   */
  now?: number;
}

const COUNT_DAYS_OF_LAST_7 = 7;
const COUNT_DAYS_OF_LAST_30 = 30;
const TITLES: Record<ETimeGroup, string> = {
  [ETimeGroup.TODAY]: '今天',
  [ETimeGroup.YESTERDAY]: '昨天',
  [ETimeGroup.LAST_7_DAYS]: '过去 7 天',
  [ETimeGroup.LAST_30_DAYS]: '一个月内',
  [ETimeGroup.EARLIER]: '更早'
};

/**
 * 按指定的时间字段对列表分组，由近到远依次为：今天、昨天、过去 7 天、一个月内、更早
 *
 * 约定：
 * - 每组都是左闭右开区间，落在跨天边界上的时间（如 0 点整）归入较近的那一组
 * - 无法解析的时间值归入「更早」，不会丢数据
 * - 空分组不会出现在结果里
 */
export default function groupListByTime<K extends string, T extends Record<K, Date>>(list: T[], field: K, {
  titles,
  now
}: IGroupByTimeOptions = {}): IGroupedListByTime<T>[] {
  const buckets: Record<ETimeGroup, T[]> = {
    [ETimeGroup.TODAY]: [],
    [ETimeGroup.YESTERDAY]: [],
    [ETimeGroup.LAST_7_DAYS]: [],
    [ETimeGroup.LAST_30_DAYS]: [],
    [ETimeGroup.EARLIER]: []
  };
  const base = new Date(now === undefined ? Date.now() : now);
  const timeTodayStart = startOfDay(base);
  const timeYesterdayStart = startOfDayBefore(base, 1);
  const timeLast7DaysStart = startOfDayBefore(base, COUNT_DAYS_OF_LAST_7 - 1);
  const timeLast30DaysStart = startOfDayBefore(base, COUNT_DAYS_OF_LAST_30 - 1);
  
  list.forEach(v => {
    const time = v[field].getTime();
    let group: ETimeGroup;
    
    if (time >= timeTodayStart) {
      group = ETimeGroup.TODAY;
    } else if (time >= timeYesterdayStart) {
      group = ETimeGroup.YESTERDAY;
    } else if (time >= timeLast7DaysStart) {
      group = ETimeGroup.LAST_7_DAYS;
    } else if (time >= timeLast30DaysStart) {
      group = ETimeGroup.LAST_30_DAYS;
    } else {
      group = ETimeGroup.EARLIER; // 含无法解析的时间（NaN 与任何值比较均为 false）
    }
    
    buckets[group].push(v);
  });
  
  return [
    ETimeGroup.TODAY,
    ETimeGroup.YESTERDAY,
    ETimeGroup.LAST_7_DAYS,
    ETimeGroup.LAST_30_DAYS,
    ETimeGroup.EARLIER
  ].map(v => ({
    group: v,
    title: titles?.[v] ?? TITLES[v],
    list: buckets[v]
  })).filter(v => v.list.length > 0);
}
