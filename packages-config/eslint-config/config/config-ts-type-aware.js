import eslintTs from 'typescript-eslint';

import rulesTsTypeAware from '../rules/rules-ts-type-aware.js';

// 用者的项目根，不能用本包目录，否则所有文件都找不到 tsconfig，类型规则静默失效
const {
  cwd
} = globalThis.process;

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.stylisticTypeChecked, // eslint-disable-line import-x/no-named-as-default-member
    ...eslintTs.configs.strictTypeChecked, // eslint-disable-line import-x/no-named-as-default-member
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: cwd()
        }
      },
      rules: rulesTsTypeAware
    },
    {
      files: ['**/*.js'],
      extends: [eslintTs.configs.disableTypeChecked] // eslint-disable-line import-x/no-named-as-default-member
    }
);
