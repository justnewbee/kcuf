import _forEach from 'lodash/forEach';

import {
  SIZE
} from '../../src';
import {
  ICodeGenerator
} from '../types';
import {
  CODE_BEGIN_ORDER_RADIUS
} from '../const';

import pushCode from './push-code';
import toCode from './to-code';
import nameConstStyledMixin from './name-const-styled-mixin';
import buildCssCode from './build-css-code';

// 生成 mixin/border-radius.ts 的代码
export default function generateCodeMixinBorderRadius(): string {
  const generator: ICodeGenerator = {
    generator: 'generate-code-mixin-border-radius',
    begin: CODE_BEGIN_ORDER_RADIUS
  };
  
  _forEach(SIZE, (_v: unknown, variableKey: string): void => {
    if (/^BORDER_RADIUS_/.test(variableKey)) {
      const cssCode = buildCssCode({
        attr: 'border-radius',
        keys: ['SIZE', variableKey],
        unit: 'px'
      });
      
      pushCode(generator, `export const ${nameConstStyledMixin(variableKey)} = css\`
${cssCode}
\`;`);
    }
  });
  
  return toCode(generator);
}
