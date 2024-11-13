import {
  ReactElement
} from 'react';

import {
  CodeViewer
} from '../../src';

import {
  CODE_TSX,
  CODE_CSS,
  CODE_HTML,
  CODE_JSON,
  CODE_MARKDOWN
} from './const';

export default function StoryDefault(): ReactElement {
  return <>
    <CodeViewer language="tsx">{CODE_TSX}</CodeViewer>
    <CodeViewer language="css">{CODE_CSS}</CodeViewer>
    <CodeViewer language="html">{CODE_HTML}</CodeViewer>
    <CodeViewer language="json">{CODE_JSON}</CodeViewer>
    <CodeViewer language="md">{CODE_MARKDOWN}</CodeViewer>
  </>;
}
