import {
  Blockquote
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Typo/Blockquote',
  component: Blockquote,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {
  args: {
    children: 'Blockquote'
  }
};