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
  MATH
} from './const';
import Demo from './demo';

const extraExtensions: MarkdownExtension[] = [{
  syntax: math(),
  html: mathHtml()
}];

export default function StoryExtensionMath(): ReactElement {
  return <Demo {...{
    source: MATH,
    options: {
      extraExtensions
    }
  }} />;
}
