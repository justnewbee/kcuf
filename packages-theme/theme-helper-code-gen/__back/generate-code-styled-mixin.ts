import {
  forEach as _forEach
} from 'lodash-es';

import createCodeGenerator from './create-module-generator';
import nameConstStyledMixin from './name-const-styled-mixin';
import buildCssCode from './build-css-code';

/**
 * 将一组对象转成 styled-components 的 mixin
 *
 *
 */
export default function generateCodeStyledMixin<T extends object>(o: T, nameParts: string): string {
  const generator = createCodeGenerator('fuck.ts');
  
  _forEach(o, (_v: string, variableKey: string): void => {
    if (/^BG_/.test(variableKey)) {
      const cssCode = buildCssCode({
        attr: 'background-color',
        keys: ['COLOR', variableKey]
      });
      
      generator.pushCode(`export const ${nameConstStyledMixin(variableKey)} = css\`
${cssCode}
\`;`);
    }
  });
  
  return generator.toCode();
}
