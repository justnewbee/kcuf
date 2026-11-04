/**
 * A broken shader is not fatal (the program simply draws nothing), so the info log
 * is traced instead of being thrown.
 */
export default function traceShaderError(info: string | null): void {
  // eslint-disable-next-line no-console
  console.trace(info);
}
