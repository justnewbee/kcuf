module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
        ie: '11'
      },
      modules: process.env.ESM === '1' ? false : 'cjs'
    }],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      version: '^7.24.7'
    }],
    'babel-plugin-styled-components'
  ]
};
