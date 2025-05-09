import {
  micromark
} from 'micromark';
import {
  Extension,
  HtmlExtension
} from 'micromark-util-types';

import {
  IMarkdownExtension,
  IMarkdownCompileOptions
} from '../types';

import getExtensionGfm from './get-extension-gfm';
import getExtensionDirective from './get-extension-directive';

/**
 * 不需要对编译使用 useMemo 做缓存，我试过，几乎没有影响
 */
export default function compileIntoHtml(source: string, {
  allowDangerousHtml,
  gfm,
  directive,
  extensions,
  processHtml
}: IMarkdownCompileOptions = {}): string {
  const syntaxExtensions: Extension[] = [];
  const htmlExtensions: HtmlExtension[] = [];
  
  function putExtensions(extension: IMarkdownExtension): void {
    extension.syntax && syntaxExtensions.push(extension.syntax);
    extension.html && htmlExtensions.push(extension.html);
  }
  
  if (gfm !== false) {
    putExtensions(getExtensionGfm());
  }
  
  if (directive) {
    putExtensions(getExtensionDirective(directive));
  }
  
  extensions?.forEach(putExtensions);
  
  const html = micromark(source, {
    allowDangerousHtml,
    extensions: syntaxExtensions,
    htmlExtensions
  });
  
  return processHtml ? processHtml(html) : html;
}
