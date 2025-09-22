import {
  json5 as cmJson5
} from 'codemirror-json5';

import {
  Extension
} from '@codemirror/state';
import {
  json as cmJson
} from '@codemirror/lang-json';
import {
  tsxLanguage as cmTsx
} from '@codemirror/lang-javascript';
import {
  css as cmCss
} from '@codemirror/lang-css';
import {
  less as cmLess
} from '@codemirror/lang-less';
import {
  sass as cmSass
} from '@codemirror/lang-sass';
import {
  html as cmHtml
} from '@codemirror/lang-html';
import {
  markdown as cmMarkdown
} from '@codemirror/lang-markdown';

export default function getExtensionLanguage(language?: string): Extension | null {
  switch (language?.toLowerCase()) {
  case 'json':
    return cmJson();
  case 'json5':
    return cmJson5();
  case 'javascript':
  case 'typescript':
  case 'js':
  case 'jsx':
  case 'ts':
  case 'tsx':
    return cmTsx;
  case 'css':
    return cmCss();
  case 'less':
    return cmLess();
  case 'sass':
    return cmSass();
  case 'htm':
  case 'html':
    return cmHtml();
  case 'md':
  case 'markdown':
    return cmMarkdown();
  default:
    return null;
  }
}
