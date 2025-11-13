import {
  HtmlText
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/HtmlText',
  component: HtmlText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    text: 'HtmlText <strong>strong</strong> <em>em</em> <code>code</code> <kbd>kbd</kbd>'
  }
};
