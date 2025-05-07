import {
  ReactElement
} from 'react';

import {
  MarkdownExtension
} from '../src';

import {
  VARIABLES
} from './const';
import Demo from './demo';
import {
  variables,
  variablesHtml
} from './extension-variables';

const extraExtensions: MarkdownExtension[] = [{
  syntax: variables(),
  html: variablesHtml({
    planet: 'boshi~t',
    'pla}net': 'jianchun.wang'
  })
}];

export default function StoryExtensionVariables(): ReactElement {
  return <Demo {...{
    source: VARIABLES,
    options: {
      extraExtensions
    }
  }} />;
}
