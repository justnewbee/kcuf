/**
 * 本地时区下某一天的 0 点时间戳
 */
export default function startOfDay(date: Date): number {
  const result = new Date(date.getTime());
  
  result.setHours(0, 0, 0, 0);
  
  return result.getTime();
}
