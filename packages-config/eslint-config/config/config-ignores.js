import {
  globalIgnores
} from 'eslint/config';

/**
 * 必须用 globalIgnores，放在任何 config 之前，否则对 dist、coverage 中的 JS 仍会生效
 *
 * @type {import('eslint').Linter.Config}
 */
export default globalIgnores([
  '**/dist/', // 构建产物，含 workspace package 下的 dist
  '**/coverage/' // 测试覆盖率，含 workspace package 下的 coverage
], 'kcuf: ignores');
