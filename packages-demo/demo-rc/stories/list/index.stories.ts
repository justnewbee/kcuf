import {
  List
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Display/List',
  component: List,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: [
      'list 1',
      'list 2',
      'list 3'
    ]
  }
};
