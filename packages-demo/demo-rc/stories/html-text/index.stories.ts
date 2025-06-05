import {
  HtmlText
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Typo/HtmlText',
  component: HtmlText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {
  args: {
    text: 'HtmlText <strong>strong</strong> <em>em</em> <code>code</code> <kbd>kbd</kbd>'
  }
};
