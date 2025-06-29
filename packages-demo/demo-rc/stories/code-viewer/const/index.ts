export const CODE_TSX = `import {
  ReactElement
} from 'react';

import {
  CodeViewer
} from '../../src';

import {
  CODE_TSX,
  CODE_CSS,
  CODE_HTML
} from './const';

export default function StoryDefault(): ReactElement {
  return <>
    <CodeViewer>{CODE_TSX}</CodeViewer>
    <CodeViewer>{CODE_CSS}</CodeViewer>
    <CodeViewer>{CODE_HTML}</CodeViewer></>;
}`;

export const CODE_CSS = `*, *::before {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}`;

export const CODE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Storybook</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="icon" type="image/svg+xml" href="./favicon.svg" />
<style>
@font-face {
  font-family: 'Nunito Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('./sb-common-assets/nunito-sans-regular.woff2') format('woff2')
}
</style>
<link href="./sb-manager/runtime.js" rel="modulepreload" />
</head>
<body>
<script>
window.FEATURES = {
  argTypeTargetsV7: true,
  legacyDecoratorFileOrder: false,
  disallowImplicitActionsInRenderV8: true
};
</script>
<script type="module">
import './sb-manager/globals-runtime.js';
import './sb-addons/essentials-outline-9/manager-bundle.js';
import './sb-manager/runtime.js';
</script>
<link href="./sb-preview/runtime.js" rel="prefetch" as="script" />
</body>
</html>`;

export const CODE_JSON = `{
  "hello": "world",
  "arr": [1, 2, false, {
     a: 123456
  }],
  right: true
}`;

export const CODE_MARKDOWN = `# @kcuf/demo-rc

> 不要用于生产代码！

写 demo 时专用的一些基础元素，带简单的样式，为了写 demo 好看和方便：

* 样式 Only
  + \`H1\`
  + \`H2\`
  + \`H3\`
  + \`H4\`
  + \`P\`
  + \`Pre\`
  + \`Hr\`
  + \`Button\`
  + \`InputText\`
  + \`InputTextarea\`
* 样式 +
  + \`List\`
  + \`CheckboxGroup\`
  + \`RadioGroup\`
  + \`CodeViewerJson5\`
  + \`Flex100HBF\`
  + \`LongArticle\`
`;
