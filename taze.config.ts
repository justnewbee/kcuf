import {
  defineConfig
} from 'taze';

// https://github.com/antfu-collective/taze?tab=readme-ov-file#config-file
export default defineConfig({
  mode: 'major',
  write: true, // write to package.json
  // ignorePaths: [],
  exclude: [ // ignore packages from bumping
    'unfetch', // 5.0 输出的是 `.mjs` 对构建有要求...
    'eslint', // TODO up 10 - https://github.com/jsx-eslint/eslint-plugin-react/issues/3977
    '@babel/*' // 暂时不能升级到 8，因为依赖包（如 antd）用到的 @babel/runtime 会导致构建失败
  ]
});
