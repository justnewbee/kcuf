interface IOptions {
  /**
   * 是否忽略中间的空格，默认 true，当 false 时，也会去除两端的空格，并且将连续的空格转成单个空格
   */
  ignoreWhitespace?: boolean;
  /**
   * 是否判断反向包含，默认 true
   *
   * | bothWay | 关键字 | 候选项 | 结果 |
   * | --- | --- | --- | --- |
   * | `false` | AB | ABC | `true` |
   * | `false` | ABC | AB | `false` |
   * | `true` | AB | ABC | `true` |
   * | `true` | ABC | AB | `true` |
   */
  bothWay?: boolean;
}

function normalizeStrForCompare(str: string, ignoreWhitespace: boolean): string {
  const strLower = str.trim().toLowerCase();
  
  return strLower.replace(/\s+/g, ignoreWhitespace ? '' : ' ');
}

/**
 * 本地搜索时的比较方法，使用 keyword 匹配可选的字符串数组，注意当 keyword 为空时，返回 true
 */
export default function localSearchCompare(keyword: string, candidateValues: string[], options: IOptions = {}): boolean {
  const {
    ignoreWhitespace = true,
    bothWay = true
  } = options;
  const kw = normalizeStrForCompare(keyword, ignoreWhitespace);
  
  if (!kw) {
    return true;
  }
  
  return candidateValues.some(v => {
    const candidate = normalizeStrForCompare(v, ignoreWhitespace);
    
    return candidate.includes(kw) || (bothWay ? kw.includes(candidate) : kw.includes(candidate));
  });
}
