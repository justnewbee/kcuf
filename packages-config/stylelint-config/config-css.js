/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    './config-order'
  ],
  rules: {
    'hue-degree-notation': 'number',
    'import-notation': 'string'
  }
};
