import {
  kebabCase as _kebabCase
} from 'lodash-es';

import {
  PREFIX_CSS_VAR
} from '../const';

/**
 * 构建 CSS Var 名称
 *
 * - 遵循 Best Practice，全部小写（CSS Variable 大小写敏感）
 * - 词组单词以 `-` 分隔，如 `light gray` → `light-gray`
 * - 组成部分以 `--` 分隔，如 `color light gray` → `color--light-gray`
 * - 所有变量统一前缀（1-4 个字符），默认为 `kf`，如 `color light gray` → `--kf-color--light-gray`
 * - 前缀后一个 `-`，不需要两个
 */
export default function nameCssVar(path: string[], prefix?: string): string {
  return `--${(prefix || PREFIX_CSS_VAR).toLowerCase()}-${path.map(_kebabCase).join('--')}`;
}
