import {
  json5
} from 'codemirror-json5';

import {
  Extension
} from '@codemirror/state';
import {
  tsxLanguage
} from '@codemirror/lang-javascript';
import {
  css
} from '@codemirror/lang-css';
import {
  less
} from '@codemirror/lang-less';
import {
  sass
} from '@codemirror/lang-sass';
import {
  html
} from '@codemirror/lang-html';
import {
  markdown
} from '@codemirror/lang-markdown';
import {
  json
} from '@codemirror/lang-json';

export default function getExtensionLanguage(language?: string): Extension | null {
  switch (language?.toLowerCase()) {
  case 'javascript':
  case 'typescript':
  case 'js':
  case 'jsx':
  case 'ts':
  case 'tsx':
    return tsxLanguage;
  case 'json':
    return json();
  case 'json5':
    return json5();
  case 'css':
    return css();
  case 'less':
    return less();
  case 'sass':
    return sass();
  case 'htm':
  case 'html':
    return html();
  case 'md':
  case 'markdown':
    return markdown();
  default:
    return null;
  }
}
