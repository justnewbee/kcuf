import {
  P
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Typo/P',
  component: P,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adip sap et dolor sit amet, sed diam eu et dolor sit amet, sed diam eu et dolor sit amet, sed diam eu et dolor sit amet, sed'
  }
};
