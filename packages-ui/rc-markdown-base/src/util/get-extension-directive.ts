import {
  HtmlOptions,
  directive,
  directiveHtml
} from 'micromark-extension-directive';

import {
  IMarkdownExtension
} from '../types';

export default function getExtensionDirective(options: HtmlOptions): IMarkdownExtension {
  return {
    syntax: directive(),
    html: directiveHtml(options)
  };
}
