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
    'immer', // TODO up 11
    'eslint' // TODO up 10
  ]
});
