import {
  Hr
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Typo/Hr',
  component: Hr,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Primary: TStory = {};
