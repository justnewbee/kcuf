import {
  Blockquote
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: 'Blockquote'
  }
};
