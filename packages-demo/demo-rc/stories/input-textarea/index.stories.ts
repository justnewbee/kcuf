import {
  InputTextarea
} from '../../src';

import {
  TMeta,
  TStory
} from './types';

const meta = {
  title: 'Form/InputTextarea',
  component: InputTextarea,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies TMeta;

export default meta;

export const Default: TStory = {
  args: {
    defaultValue: 'InputTextarea'
  }
};
