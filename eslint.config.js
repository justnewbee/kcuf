import {
  fileURLToPath
} from 'node:url';

import {
  defineConfig,
  globalIgnores,
  includeIgnoreFile
} from 'eslint/config';

import kcufEslintConfig from '@kcuf/eslint-config';

export default defineConfig([
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url)), {
    gitignoreResolution: true
  }),
  globalIgnores([
    '**/*/.babelrc.js' // TODO module / process 在 JS 中找不到
  ]),
  ...kcufEslintConfig
]);
