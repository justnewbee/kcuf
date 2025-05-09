import {
  CompileContext,
  HtmlExtension
} from 'micromark-util-types';

import {
  VARIABLE_TYPES
} from './const';

export default function variablesHtml(data: Record<string, string> = {}): HtmlExtension {
  return {
    enter: {
      [VARIABLE_TYPES._](this: CompileContext) {
        console.info('enter _'); // eslint-disable-line no-console
        
        this.tag('<code class="variables">');
      },
      [VARIABLE_TYPES.MARKER_START](this: CompileContext) {
        console.info('enter marker START'); // eslint-disable-line no-console
      },
      [VARIABLE_TYPES.STRING](this: CompileContext) {
        console.info('enter string'); // eslint-disable-line no-console
        
        this.buffer();
      },
      [VARIABLE_TYPES.MARKER_END]() {
        console.info('enter marker END'); // eslint-disable-line no-console
      }
    },
    exit: {
      [VARIABLE_TYPES._](this: CompileContext) {
        console.info('exit _'); // eslint-disable-line no-console
        
        this.tag('</code>');
      },
      [VARIABLE_TYPES.MARKER_START](this: CompileContext) {
        console.info('exit marker START'); // eslint-disable-line no-console
      },
      [VARIABLE_TYPES.STRING](this: CompileContext) {
        console.info('exit string'); // eslint-disable-line no-console
        
        const str = this.resume();
        
        if (str in data) {
          this.raw(this.encode(data[str] || ''));
        }
      },
      [VARIABLE_TYPES.MARKER_END](this: CompileContext) {
        console.info('exit marker END'); // eslint-disable-line no-console
      }
    }
  };
}
