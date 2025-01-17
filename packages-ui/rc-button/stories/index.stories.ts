import Button from '../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default = {
  args: {
    label: 'button label instead of children'
  }
} satisfies TStory;

export { default as Misc } from './story-misc';
