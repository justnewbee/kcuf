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

function processType(type: string): string {
  return codify(safeCellContent(type.replaceAll('ReactElement<any, string | JSXElementConstructor<any>>', 'ReactElement')));
}

function generateMarkdownTable(component: ComponentDoc): string {
  const props: Record<string, PropItem> = component.props || {};
  const markdownLines = [
    '| Prop | Type | Default | Description |',
    '| --- | --- | --- | --- |'
  ];
  
  for (const [propName, prop] of Object.entries(props)) {
    markdownLines.push(`| ${[
      prop.required ? `${codify(propName)} <Required />` : codify(propName),
      processType(prop.type.name),
      prop.defaultValue ? prop.defaultValue.value : '-',
      safeCellContent(prop.description)
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
