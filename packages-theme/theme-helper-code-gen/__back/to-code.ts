import {
  ICodeGenerator
} from '../types';

const INDENT = '  ';

export default function toCode({
  generator,
  begin,
  body = [],
  end,
  indent = 0
}: ICodeGenerator): string {
  const indentString = INDENT.repeat(indent);
  
  return [generator ? `// generated by ${generator}.ts\n` : undefined, begin, ...body.map(v => `${indentString}${v}`), end].filter(v => v !== undefined).join('\n');
}
