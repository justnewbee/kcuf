import {
  ReactElement
} from 'react';
import {
  math,
  mathHtml
} from 'micromark-extension-math';

import {
  MarkdownExtension
} from '../src';

import {
  MD_MATH
} from './const';
import Demo from './demo';

const extensions: MarkdownExtension[] = [{
  syntax: math(),
  html: mathHtml()
}];

export default function StoryExtensionMath(): ReactElement {
  return <Demo {...{
    source: MD_MATH,
    options: {
      extensions
    }
  }} />;
}
