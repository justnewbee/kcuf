import {
  LongArticle
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Placeholder/LongArticle',
  component: LongArticle,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {};