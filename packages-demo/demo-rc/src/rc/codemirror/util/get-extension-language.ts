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
  json
} from '@codemirror/lang-json';
import {
  markdown
} from '@codemirror/lang-markdown';

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