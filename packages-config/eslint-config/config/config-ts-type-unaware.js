import eslintTs from 'typescript-eslint';

import rulesTsTypeUnaware from '../rules/rules-ts-type-unaware.js';

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.stylistic, // eslint-disable-line import/no-named-as-default-member
    ...eslintTs.configs.strict, // eslint-disable-line import/no-named-as-default-member
    {
      rules: rulesTsTypeUnaware
    }
);
