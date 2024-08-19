module.exports = {
  extends: 'npm-package-json-lint-config-default',
  rules: { // rules ref: https://npmpackagejsonlint.org/docs/rules
    // required stuff
    'require-description': 'error',
    'require-keywords': 'error',
    'require-license': 'error',
    'require-author': 'error',
    'require-bugs': 'error',
    'require-repository': 'error',
    'require-homepage': 'error',
    // format
    'name-format': 'error',
    'version-format': 'error',
    'description-format': ['error', {
      requireCapitalFirstLetter: true,
      requireEndingPeriod: true
    }],
    // no- / prefer-
    'no-repeated-dependencies': 'error',
    'no-duplicate-properties': 'error',
    'prefer-alphabetical-peerDependencies': 'error',
    'prefer-alphabetical-dependencies': 'error',
    'prefer-alphabetical-devDependencies': 'error',
    'prefer-alphabetical-optionalDependencies': 'error',
    'prefer-alphabetical-bundledDependencies': 'error',
    'prefer-property-order': ['error', [
      // basic info
      'name',
      'version',
      'description',
      'keywords',
      'license',
      // output
      'private',
      'sideEffects',
      'files',
      'exports',
      'main',
      'module',
      'umd',
      'browser',
      'types',
      'directories',
      'bin',
      'man',
      // repo info
      'repository',
      'workspaces',
      'homepage',
      'bugs',
      'author',
      'authors',
      'contributors',
      'funding',
      'publishConfig',
      // env
      'engines',
      'os',
      'cpu',
      // dep
      'packageManager',
      'devDependencies',
      'bundleDependencies',
      'peerDependencies',
      'peerDependenciesMeta',
      'optionalDependencies',
      'dependencies',
      'overrides',
      // config
      'pre-commit',
      'lint-staged',
      'eslintConfig',
      'stylelint',
      'npmpackagejsonlint',
      'babel',
      'browserify',
      // npm run
      'config',
      'scripts'
    ]]
  }
};