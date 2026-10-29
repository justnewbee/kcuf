/** @type {import('stylelint').Config} */
export default {
  extends: [
    '@stylistic/stylelint-config'
  ],
  rules: {
    '@stylistic/string-quotes': 'single',
    '@stylistic/no-eol-whitespace': [true, {
      ignore: ['empty-lines']
    }],
    '@stylistic/max-line-length': 200,
    '@stylistic/declaration-colon-newline-after': null
  }
};
