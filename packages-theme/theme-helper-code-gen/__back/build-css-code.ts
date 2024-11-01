import nameCssVar from './name-css-var';
import buildInterpolation from './build-interpolation';

interface IParams {
  attr: string;
  keys: string[];
  indent?: number; // 缩进层级
  before?: string;
  unit?: string;
}

const INDENT = '  ';

/**
 * 生成 IE 兼容的 styled-components mixin css 代码，如
 *
 * ```
 *
 * ```
 */
export default function buildCssCode({
  attr,
  keys,
  before = '',
  unit = '',
  indent = 1
}: IParams): string {
  const varInterpolation = buildInterpolation(keys, unit);
  const leftPart = `${INDENT.repeat(indent)}${attr}: ${before}`;
  
  return [
    `${leftPart}${varInterpolation};`,
    `${leftPart}var(${nameCssVar(keys)}, ${varInterpolation});`
  ].join('\n');
}
