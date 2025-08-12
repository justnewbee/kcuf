import {
  Extension,
  Code,
  State
} from 'micromark-util-types';
import {
  codes,
  types
} from 'micromark-util-symbol';

import {
  VARIABLE_TYPES
} from './const';

export default function variablesSyntax(): Extension {
  return {
    text: {
      [codes.leftCurlyBrace]: {
        name: 'variables',
        tokenize(effects, ok, nok): State {
          function inside(code: Code): State | undefined {
            switch (code) {
            case null:
            case codes.carriageReturn:
            case codes.lineFeed:
            case codes.carriageReturnLineFeed:
              return nok(code);
            case codes.backslash:
              effects.consume(code);
              
              return insideEscape; // eslint-disable-line no-use-before-define
            case codes.rightCurlyBrace:
              effects.exit(types.chunkString);
              effects.exit(VARIABLE_TYPES.STRING);
              effects.enter(VARIABLE_TYPES.MARKER_END);
              effects.consume(code);
              effects.exit(VARIABLE_TYPES.MARKER_END);
              effects.exit(VARIABLE_TYPES._);
              
              return ok;
            default:
              effects.consume(code);
              
              return inside;
            }
          }
          
          function insideEscape(code: Code): State | undefined {
            if (code === codes.backslash || code === codes.rightCurlyBrace) {
              effects.consume(code);
              
              return inside;
            }
            
            return inside(code);
          }
          
          function begin(code: Code): State | undefined {
            return code === codes.rightCurlyBrace ? nok(code) : inside(code);
          }
          
          return (code: Code): State => {
            console.info('start', code); // eslint-disable-line no-console
            
            effects.enter(VARIABLE_TYPES._);
            effects.enter(VARIABLE_TYPES.MARKER_START);
            effects.consume(code);
            effects.exit(VARIABLE_TYPES.MARKER_START);
            effects.enter(VARIABLE_TYPES.STRING);
            effects.enter(types.chunkString, {
              contentType: 'string'
            });
            
            return begin;
          };
        }
      }
    }
  };
}
