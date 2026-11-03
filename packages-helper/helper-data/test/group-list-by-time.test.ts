import {
  describe,
  test,
  expect
} from 'vitest';

import {
  groupListByTime,
  GroupedListByTime,
  TimeGroup
} from '../src';

interface IItem {
  id: string;
  time: Date;
}

interface IItemWithTimes {
  id: string;
  timeCreated: Date;
  timeUpdated: Date;
}

/**
 * 用本地时间构造日期，避免日期字符串在不同时区下的解析差异
 */
const createDate = (year: number, month: number, date: number, hours = 0, minutes = 0): Date => new Date(year, month - 1, date, hours, minutes, 0, 0);
const createItem = (id: string, time: Date): IItem => ({
  id,
  time
});
const lastMillisBefore = (date: Date): Date => new Date(date.getTime() - 1);
const summarize = (groups: GroupedListByTime<{
  id: string;
}>[]): [TimeGroup, string[]][] => groups.map<[TimeGroup, string[]]>(v => [v.group, v.list.map(item => item.id)]);

/**
 * 分组基准时间：2026-11-03 15:30（本地时区）
 */
const NOW = createDate(2026, 11, 3, 15, 30).getTime();

/**
 * 每组各一条数据
 */
const FULL_LIST: IItem[] = [
  createItem('today', createDate(2026, 11, 3, 10)),
  createItem('yesterday', createDate(2026, 11, 2, 10)),
  createItem('last7', createDate(2026, 10, 29, 10)),
  createItem('last30', createDate(2026, 10, 20, 10)),
  createItem('earlier', createDate(2026, 10, 1, 10))
];

describe('groupListByTime(list, field, options)', () => {
  test('groups items into near-to-far time groups', () => {
    const list = [...FULL_LIST].reverse();
    const result = groupListByTime(list, 'time', {
      now: NOW
    });
    
    expect(summarize(result)).toEqual([
      [TimeGroup.TODAY, ['today']],
      [TimeGroup.YESTERDAY, ['yesterday']],
      [TimeGroup.LAST_7_DAYS, ['last7']],
      [TimeGroup.LAST_30_DAYS, ['last30']],
      [TimeGroup.EARLIER, ['earlier']]
    ]);
  });
  
  test('puts midnight boundaries into the nearer group', () => {
    const list: IItem[] = [
      createItem('today', createDate(2026, 11, 3)),
      createItem('yesterday', createDate(2026, 11, 2)),
      createItem('last7', createDate(2026, 10, 28)),
      createItem('last30', createDate(2026, 10, 5)),
      createItem('earlier', createDate(2026, 10, 4))
    ];
    const result = groupListByTime(list, 'time', {
      now: NOW
    });
    
    expect(summarize(result)).toEqual([
      [TimeGroup.TODAY, ['today']],
      [TimeGroup.YESTERDAY, ['yesterday']],
      [TimeGroup.LAST_7_DAYS, ['last7']],
      [TimeGroup.LAST_30_DAYS, ['last30']],
      [TimeGroup.EARLIER, ['earlier']]
    ]);
  });
  
  test('puts times just before a midnight boundary into the farther group', () => {
    const list: IItem[] = [
      createItem('yesterday', lastMillisBefore(createDate(2026, 11, 3))),
      createItem('last7', lastMillisBefore(createDate(2026, 11, 2))),
      createItem('last30', lastMillisBefore(createDate(2026, 10, 28))),
      createItem('earlier', lastMillisBefore(createDate(2026, 10, 5)))
    ];
    const result = groupListByTime(list, 'time', {
      now: NOW
    });
    
    expect(summarize(result)).toEqual([
      [TimeGroup.YESTERDAY, ['yesterday']],
      [TimeGroup.LAST_7_DAYS, ['last7']],
      [TimeGroup.LAST_30_DAYS, ['last30']],
      [TimeGroup.EARLIER, ['earlier']]
    ]);
  });
  
  test('omits empty groups', () => {
    const result = groupListByTime([createItem('today', createDate(2026, 11, 3, 10))], 'time', {
      now: NOW
    });
    
    expect(result.map(v => v.group)).toEqual([TimeGroup.TODAY]);
  });
  
  test('returns an empty array for an empty list', () => {
    expect(groupListByTime([], 'time', {
      now: NOW
    })).toEqual([]);
  });
  
  test('keeps the input order inside a group', () => {
    const list: IItem[] = [
      createItem('c', createDate(2026, 11, 3, 18)),
      createItem('a', createDate(2026, 11, 3, 8)),
      createItem('b', createDate(2026, 11, 3, 13))
    ];
    const result = groupListByTime(list, 'time', {
      now: NOW
    });
    
    expect(summarize(result)).toEqual([[TimeGroup.TODAY, ['c', 'a', 'b']]]);
  });
  
  test('keeps the original item references', () => {
    const item = {
      id: 'today',
      time: createDate(2026, 11, 3, 10)
    };
    const result = groupListByTime([item], 'time', {
      now: NOW
    });
    
    expect(result[0]?.list[0]).toBe(item);
  });
  
  test('groups by the given field', () => {
    const list: IItemWithTimes[] = [{
      id: 'item',
      timeCreated: createDate(2026, 11, 3, 10),
      timeUpdated: createDate(2026, 10, 1, 10)
    }];
    const byCreated = groupListByTime(list, 'timeCreated', {
      now: NOW
    });
    const byUpdated = groupListByTime(list, 'timeUpdated', {
      now: NOW
    });
    
    expect(summarize(byCreated)).toEqual([[TimeGroup.TODAY, ['item']]]);
    expect(summarize(byUpdated)).toEqual([[TimeGroup.EARLIER, ['item']]]);
  });
  
  test('uses default titles', () => {
    const result = groupListByTime(FULL_LIST, 'time', {
      now: NOW
    });
    
    expect(result.map(v => v.title)).toEqual(['今天', '昨天', '过去 7 天', '一个月内', '更早']);
  });
  
  test('overrides titles with custom ones', () => {
    const result = groupListByTime(FULL_LIST, 'time', {
      now: NOW,
      titles: {
        [TimeGroup.TODAY]: 'Today',
        [TimeGroup.EARLIER]: 'Older'
      }
    });
    
    expect(result.map(v => v.title)).toEqual(['Today', '昨天', '过去 7 天', '一个月内', 'Older']);
  });
  
  test('groups invalid dates into the earlier group', () => {
    const list: IItem[] = [
      createItem('invalid', new Date('not-a-date')),
      createItem('earlier', createDate(2026, 10, 1, 10))
    ];
    const result = groupListByTime(list, 'time', {
      now: NOW
    });
    
    expect(summarize(result)).toEqual([[TimeGroup.EARLIER, ['invalid', 'earlier']]]);
  });
  
  test('uses the current time when now is not given', () => {
    const todayNoon = new Date();
    
    todayNoon.setHours(12, 0, 0, 0);
    
    const list: IItem[] = [
      createItem('today', todayNoon),
      createItem('earlier', createDate(2000, 1, 1, 12))
    ];
    const result = groupListByTime(list, 'time');
    
    expect(summarize(result)).toEqual([
      [TimeGroup.TODAY, ['today']],
      [TimeGroup.EARLIER, ['earlier']]
    ]);
  });
});
