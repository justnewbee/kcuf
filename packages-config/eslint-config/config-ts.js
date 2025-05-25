import eslintTs from 'typescript-eslint';

// https://typescript-eslint.io/rules/

/** @type {import('eslint').Linter.Config[]} */
export default eslintTs.config(
    ...eslintTs.configs.stylistic, // eslint-disable-line import/no-named-as-default-member
    ...eslintTs.configs.strict, // eslint-disable-line import/no-named-as-default-member
    // TODO 以下无法在非 src 下生效
    // https://typescript-eslint.io/troubleshooting/typed-linting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
    // ...eslintTs.configs.stylisticTypeChecked, // eslint-disable-line import/no-named-as-default-member
    // ...eslintTs.configs.strictTypeChecked, // eslint-disable-line import/no-named-as-default-member
    {
      // languageOptions: {
      //   parserOptions: {
      //     projectService: {
      //       allowDefaultProject: ['*.js', '*.mjs']
      //     },
      //     tsconfigRootDir: import.meta.dirname
      //   }
      // },
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/naming-convention': ['error', {
          selector: 'function',
          format: ['strictCamelCase', 'StrictPascalCase'],
          leadingUnderscore: 'allow',
          filter: { // 允许方法名中有 ZIndex，比如 getZIndex 等
            regex: 'ZIndex',
            match: false
          }
        }, {
          selector: 'variable',
          format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
          filter: {
            regex: '[A-Z\\d\\$]__[\\$A-Z\\d]',
            match: false
          }
        }, {
          selector: 'parameter',
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow'
        }, {
          selector: 'typeLike',
          format: ['StrictPascalCase']
        }, {
          selector: 'enum',
          format: ['StrictPascalCase'],
          prefix: ['E']
        }, {
          selector: 'interface',
          format: ['StrictPascalCase'],
          prefix: ['I']
        }, {
          selector: 'typeAlias',
          format: ['StrictPascalCase'],
          prefix: ['T']
        }, {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['strictCamelCase'],
          leadingUnderscore: 'allow'
        }, {
          selector: 'enumMember',
          format: ['StrictPascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '[A-Z\\d\\$]__[\\$A-Z\\d]',
            match: false
          }
        }, { // allow anything in destructured properties
          selector: ['variable', 'parameter'],
          modifiers: ['destructured'],
          format: null
        }],
        '@typescript-eslint/explicit-function-return-type': ['warn', {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowIIFEs: true
        }],
        '@typescript-eslint/method-signature-style': ['error', 'method'],
        '@typescript-eslint/no-empty-object-type': ['error', {
          allowInterfaces: 'with-single-extends'
        }],
        '@typescript-eslint/no-invalid-void-type': 'off', // 只能禁用，因为它会阻止 `Xx | void`（无法配置去掉限制）
        '@typescript-eslint/no-unused-vars': ['error', {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }],
        '@typescript-eslint/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTernary: true,
          enforceForJSX: true
        }],
        // '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/prefer-function-type': 'error'
      }
    }
);
