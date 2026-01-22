import eslintTs from 'typescript-eslint';

import rulesTsTypeAware from '../rules/rules-ts-type-aware.js';

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.stylisticTypeChecked, // eslint-disable-line import/no-named-as-default-member
    ...eslintTs.configs.strictTypeChecked, // eslint-disable-line import/no-named-as-default-member
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname
        }
      },
      rules: rulesTsTypeAware
    },
    {
      files: ['**/*.js'],
      extends: [eslintTs.configs.disableTypeChecked] // eslint-disable-line import/no-named-as-default-member
    }
);
