import {
  InputText
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Form/InputText',
  component: InputText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {
  args: {
    defaultValue: 'InputText'
  }
};
