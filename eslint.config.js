import {
  defineConfig,
  globalIgnores
} from 'eslint/config';

import kcufEslintConfig from '@kcuf/eslint-config';

export default defineConfig([
  ...kcufEslintConfig,
  globalIgnores([
    '**/*/.babelrc.js' // TODO module / process 在 JS 中找不到
  ])
]);
