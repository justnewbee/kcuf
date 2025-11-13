import {
  P
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Typo/P',
  component: P,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adip sap et dolor sit amet, sed diam eu et dolor sit amet, sed diam eu et dolor sit amet, sed diam eu et dolor sit amet, sed'
  }
};
