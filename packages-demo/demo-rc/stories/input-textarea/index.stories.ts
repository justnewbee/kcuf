import {
  InputTextarea
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Form/InputTextarea',
  component: InputTextarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    defaultValue: 'InputTextarea'
  }
};
