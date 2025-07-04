import path from 'node:path';
import {
  existsSync
} from 'node:fs';
import process from 'node:process';

import {
  program
} from 'commander';
import {
  ComponentDoc,
  PropItem,
  withCustomConfig
} from 'react-docgen-typescript';

interface ICommandArgs {
  dir: string;
}

const parser = withCustomConfig('./tsconfig.json', {
  propFilter: (prop: PropItem) => prop.parent ? !prop.parent.fileName.includes('node_modules') : true
});

function codify(content: string): string {
  return `\`${content}\``;
}

function safeCellContent(content?: string): string {
  return content ? content.replaceAll('|', '\\|').replaceAll('\n', '<br />') : '';
}

function printPropName(prop: PropItem): string {
  const parts: string[] = [codify(prop.name)];
  
  if (prop.required) {
    parts.push('<TagRequired />');
  } else {
    if (prop.defaultValue && prop.defaultValue.value !== false) { // JSDoc 中添加 `@default`，默认对类型为 `boolean` 的使用 `false` 做默认值
      parts.push(`<TagDefault>${prop.defaultValue.value}</TagDefault>`);
    }
  }
  
  return parts.join(' ');
}

function printPropType(prop: PropItem): string {
  return codify(safeCellContent(prop.type.name.replaceAll('ReactElement<any, string | JSXElementConstructor<any>>', 'ReactElement')));
}

function printPropDescription(prop: PropItem): string {
  return safeCellContent(prop.description);
}

function generateMarkdownTable(component: ComponentDoc): string {
  const markdownPropsLines = [
    '| 属性 | 类型 | 说明 |',
    '| --- | --- | --- |'
  ];
  
  for (const [, prop] of Object.entries(component.props)) {
    markdownPropsLines.push(`| ${[
      printPropName(prop),
      printPropType(prop),
      printPropDescription(prop)
    ].join(' | ')} |`);
  }
  
  return markdownPropsLines.join('\n');
}

function generateOnFilePath(filePath: string): void {
  const component = parser.parse(filePath)[0];
  
  if (component) {
    console.info(generateMarkdownTable(component)); // eslint-disable-line no-console
  } else {
    console.warn(`No component found at ${filePath}`); // eslint-disable-line no-console
  }
}

function readAndGenerate(options: ICommandArgs): void {
  const entryFilePathTs = path.join(process.cwd(), '..', options.dir, 'index.ts');
  const entryFilePathTsx = path.join(process.cwd(), '..', options.dir, 'index.tsx');
  
  if (existsSync(entryFilePathTs)) {
    generateOnFilePath(entryFilePathTs);
    
    return;
  }
  
  if (existsSync(entryFilePathTsx)) {
    generateOnFilePath(entryFilePathTsx);
    
    return;
  }
  
  console.warn(`File ${entryFilePathTsx}? not found.`); // eslint-disable-line no-console
}

/**
 * How to use:
 *
 * > ts-node-dev ./script/generate-md-api-pref.ts -d <dir>
 */
program.requiredOption('-d, --dir <dir>').parse();

readAndGenerate(program.opts<ICommandArgs>());
