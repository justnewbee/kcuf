/**
 * 静默失败，但又不完全静默（开发和测试环境有控制台输出），用以忽略不重要的运行时错误
 */
export default function errorIgnore(error: unknown): void {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.info('%cIgnoredForProd %o', 'background-color:#f30;color:#fff;', error);
  }
}
