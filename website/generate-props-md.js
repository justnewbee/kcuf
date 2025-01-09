const path = require('path');
const fs = require('fs');
const { withCustomConfig } = require('react-docgen-typescript');

const parser = withCustomConfig('./tsconfig.json', {
  propFilter: (prop) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes('node_modules');
    }
    
    return true;
  }
});

const componentDir = path.join(__dirname, '../packages-ui/rc-button/src'); // 指定组件目录
const outputDir = path.join(__dirname, 'docs/api'); // 指定输出目录

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(componentDir).forEach((file) => {
  const filePath = path.join(componentDir, file);
  const componentDocs = parser.parse(filePath);
  
  if (componentDocs.length > 0) {
    const component = componentDocs[0];
    const markdownContent = generateMarkdownTable(component);
    const outputFilePath = path.join(outputDir, `${path.basename(file, '.ts')}.md`);
    
    fs.writeFileSync(outputFilePath, markdownContent);
  }
});

function generateMarkdownTable(component) {
  const props = component.props || {};
  const markdownLines = [
    '| Prop | Type | Required | Default | Description |',
    '| --- | --- | --- | --- | --- |'
  ];
  
  for (const [propName, prop] of Object.entries(props)) {
    const type = prop.type;
    const required = prop.required ? 'Yes' : 'No';
    const defaultValue = prop.defaultValue ? prop.defaultValue.value : '-';
    const description = prop.description?.replaceAll('|', '\\|').replaceAll('\n', '<br />') || '-';
    
    markdownLines.push(`| \`${propName}\` | \`${getTypeString(type).replaceAll('|', '\\|')}\` | ${required} | ${defaultValue} | ${description} |`);
  }
  
  return markdownLines.join('\n');
}

function getTypeString(type) {
  if (type.kind === 'union') {
    return type.elements.map(getTypeString).join(' | ');
  }
  
  if (type.kind === 'enum') {
    return type.name;
    // return type.members.map((member) => member.value).join(' | ');
  }
  
  return type.name || type.value;
}
