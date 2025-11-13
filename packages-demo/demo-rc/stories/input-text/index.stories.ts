import {
  InputText
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

export default {
  title: 'Form/InputText',
  component: InputText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export const Default: TStory = {
  args: {
    defaultValue: 'InputText'
  }
};
