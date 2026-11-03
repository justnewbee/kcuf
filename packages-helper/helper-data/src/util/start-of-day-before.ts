/**
 * 本地时区下基准日期往前推 count 天的 0 点时间戳，按日历天回退，不受夏令时影响
 */
export default function startOfDayBefore(date: Date, count: number): number {
  const result = new Date(date.getTime());
  
  result.setDate(result.getDate() - count);
  result.setHours(0, 0, 0, 0);
  
  return result.getTime();
}
