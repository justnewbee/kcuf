import {
  forEach as _forEach
} from 'lodash-es';

import {
  COLOR,
  TYPO,
  SIZE
} from '../../src';
import {
  ICodeGenerator
} from '../types';

import pushCode from './push-code';
import toCode from './to-code';
import nameCssVar from './name-css-var';

// 生成 doc/console-base.less 的代码（供 IDE 快速参考）
export default function generateCodeCssVars(): string {
  const generator: ICodeGenerator = {
    generator: 'generate-code-css-vars',
    begin: `// 仅做参考，且放在仓库里 IDE 可以有提示
:root {`,
    end: '}',
    indent: 1
  };
  
  // TODO shadow 还没有 export
  _forEach({
    COLOR,
    TYPO
  }, (variables, upperWhatKey: string) => {
    _forEach(variables, (realValue: string, variableKey: string): void => pushCode(generator, `${nameCssVar(upperWhatKey, variableKey)}: ${realValue};`));
  });
  
  _forEach(SIZE, (v, key: string) => {
    if (/^BORDER_RADIUS_/.test(key)) {
      pushCode(generator, `${nameCssVar('SIZE', key)}: ${v}px;`);
    }
  });
  
  return toCode(generator);
}
