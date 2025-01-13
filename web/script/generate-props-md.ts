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
  pkg: string;
}

const parser = withCustomConfig('./tsconfig.json', {
  propFilter: (prop: PropItem) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes('node_modules');
    }
    
    return true;
  }
});

function codify(content: string): string {
  return `\`${content}\``;
}

function safeCellContent(content?: string): string {
  return content.replaceAll('|', '\\|').replaceAll('\n', '<br />') || '';
}

function printPropName(prop: PropItem): string {
  return prop.required ? `${codify(prop.name)} <Required />` : codify(prop.name);
}

function printPropType(prop: PropItem): string {
  return codify(safeCellContent(prop.type.name.replaceAll('ReactElement<any, string | JSXElementConstructor<any>>', 'ReactElement')));
}

function printPropDescription(prop: PropItem): string {
  return safeCellContent(prop.description);
}

/**
 * JSDoc 中添加 `@default`，默认对类型为 `boolean` 的使用 `false` 做默认值
 */
function printPropDefault(prop: PropItem): string {
  if (prop.defaultValue) {
    return codify(prop.defaultValue.value);
  }
  
  if (prop.type.name === 'boolean') {
    return codify('false');
  }
  
  return '-';
}

function generateMarkdownTable(component: ComponentDoc): string {
  const markdownLines = [
    '| Name | Type | Default | Description |',
    '| --- | --- | :-: | --- |'
  ];
  
  for (const [, prop] of Object.entries(component.props)) {
    markdownLines.push(`| ${[
      printPropName(prop),
      printPropType(prop),
      printPropDefault(prop),
      printPropDescription(prop)
    ].join(' | ')} |`);
  }
  
  return markdownLines.join('\n');
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
  const entryFilePathTs = path.join(process.cwd(), '..', options.pkg, 'src/index.ts');
  const entryFilePathTsx = path.join(process.cwd(), '..', options.pkg, 'src/index.tsx');
  
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
 * > ts-node-dev ./script/generate-props-md -p <pkg>
 */
program.requiredOption('-p, --pkg <pkg>').parse();

readAndGenerate(program.opts<ICommandArgs>());
