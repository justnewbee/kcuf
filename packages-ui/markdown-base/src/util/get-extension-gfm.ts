import {
  gfm,
  gfmHtml
} from 'micromark-extension-gfm';

import {
  IMarkdownExtension
} from '../types';

export default function getExtensionGfm(): IMarkdownExtension {
  return {
    syntax: gfm({
      singleTilde: false
    }),
    html: gfmHtml()
  };
}
